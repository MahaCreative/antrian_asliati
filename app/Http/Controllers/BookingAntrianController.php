<?php

namespace App\Http\Controllers;

use App\Events\GlobalEvents;
use App\Models\Antrian;
use App\Models\AntrianPoli;
use App\Models\Dokter;
use App\Models\JadwalDokter;
use App\Models\PanggilanAntrian;
use App\Models\Pasien;
use App\Models\Poli;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BookingAntrianController extends Controller
{
    public function index(Request $request)
    {
        $user = User::find($request->user()->id);
        $pasien = Pasien::where('user_id', $request->user()->id)->get();

        $antrianSaya = AntrianPoli::with('poli')
            ->whereIn('pasien_id', $pasien->pluck('id'))
            ->latest()
            ->get();

        // Load jadwal dokter sekaligus relasi dokter dan poli-nya
        $jadwalDokter = JadwalDokter::with(['dokter' => function ($q) {
            $q->with('poli');
        }])->get();

        $poli = Poli::all();
        $dokter = Dokter::all();

        return inertia('Guset/BookingAntrian/Index', [
            'user'         => $user,
            'antrianSaya'  => $antrianSaya,
            'pasien'       => $pasien,
            'poli'         => $poli,
            'dokter'       => $dokter,
            'jadwalDokter' => $jadwalDokter,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'tanggal_kunjungan' => 'required|date|after_or_equal:today',
            'dokter_id' => 'required',
            'poli_id' => 'required',
            'keluarga_id' => 'required'
        ]);

        $pasien = Pasien::findOrFail($request->keluarga_id);

        // ✅ Cek apakah sudah punya antrian pending di tanggal yang sama
        $cekAntrian = AntrianPoli::whereDate('tanggal_kunjungan', Carbon::parse($request->tanggal_kunjungan))
            ->where('pasien_id', $pasien->id)
            ->where('status', 'pending')
            ->first();

        if ($cekAntrian) {
            return response()->json([
                'message' => 'Anda sudah memiliki antrian dengan status pending pada tanggal ini.'
            ], 422);
        }

        // ✅ Ambil prefix kode antrian dari tabel poli
        $poli = Poli::findOrFail($request->poli_id); // pastikan kamu sudah import model Poli

        // ✅ Hitung jumlah antrian pada hari & poli yang sama
        $jumlahAntrianHariIni = AntrianPoli::whereDate('tanggal_kunjungan', Carbon::parse($request->tanggal_kunjungan))
            ->where('poli_id', $request->poli_id)
            ->count();

        // ✅ Tambah 1 untuk antrian baru
        $noAntrian = $jumlahAntrianHariIni + 1;

        // ✅ Formatkan nomor antrian misalnya 3 digit: 001, 002, dst
        $noAntrianFormatted = str_pad($noAntrian, 3, '0', STR_PAD_LEFT);

        // ✅ Gabungkan prefix kode dari poli dengan nomor antrian
        $kodeAntrian = $poli->kd_antrian . '-' . $noAntrianFormatted;

        // ✅ Simpan antrian baru
        $booking = AntrianPoli::create([
            'kd_antrian' => $kodeAntrian,
            'pasien_id' => $pasien->id,
            'dokter_id' => $request->dokter_id,
            'poli_id' => $request->poli_id,
            'nik' => $pasien->nik,
            'bpjs' => $pasien->bpjs,
            'nama_pasien' => $pasien->nama,
            'jenis_kelamin' => $pasien->jenis_kelamin,
            'tanggal_lahir' => $pasien->tanggal_lahir,
            'alamat' => $pasien->alamat,
            'phone_number' => $pasien->phone_number,
            'tanggal_kunjungan' => $request->tanggal_kunjungan,
            'status' => 'pending', // pastikan ada default status
        ]);

        broadcast(new GlobalEvents(null))->toOthers();

        return response()->json([
            'message' => 'Antrian berhasil dibuat!',
            'kd_antrian' => $kodeAntrian
        ]);
    }


    public function history(Request $request)
    {
        $keluarga = Pasien::where('user_id', $request->user()->id)->pluck('id');

        $antrianPoli = AntrianPoli::with('poli', 'dokter', 'pasien')
            ->whereIn('pasien_id', $keluarga)
            ->latest()
            ->get();

        // ambil progress antrian per poli & tanggal
        $progress = AntrianPoli::select('poli_id', 'tanggal_kunjungan', DB::raw('MAX(kd_antrian) as terakhir'))
            ->where('status', 'called')
            ->groupBy('poli_id', 'tanggal_kunjungan')
            ->get()
            ->map(function ($row) {
                return [
                    'poli_id' => $row->poli_id,
                    'tanggal_kunjungan' => $row->tanggal_kunjungan,
                    'terakhir_dipanggil' => $row->terakhir,
                ];
            });
        $panggilanHariIni = AntrianPoli::with('poli')
            ->whereDate('tanggal_kunjungan', now()->toDateString())
            ->select('poli_id', 'kd_antrian', 'status')
            ->get()
            ->groupBy('poli_id');
        return inertia('Guset/BookingAntrian/HistoryAntrian', [
            'antrianPoli' => $antrianPoli,
            'progress' => $progress,
            'panggilanHariIni' => $panggilanHariIni,
        ]);
    }



    public function getJumlahAntrian(Request $request)
    {
        $jumlah = AntrianPoli::where('dokter_id', $request->dokter_id)
            ->where('poli_id', $request->poli_id)
            ->whereDate('tanggal_kunjungan', $request->tanggal_kunjungan)
            ->count();

        return response()->json(['jumlah' => $jumlah]);
    }
}
