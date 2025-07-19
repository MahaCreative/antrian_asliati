<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\AntrianPoli;
use App\Models\PanggilanAntrian;
use App\Models\Pasien;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookingAntrianController extends Controller
{
    public function index(Request $request)
    {
        $user = User::find($request->user()->id);

        $pasien = Pasien::where('user_id', $request->user()->id)->get();

        $antrianSaya = AntrianPoli::with('poli')->whereIn('pasien_id', $pasien->pluck('id'))->latest()->get();

        return inertia('Guset/BookingAntrian/Index', compact('user', 'antrianSaya', 'pasien'));
    }
    public function store(Request $request)
    {

        $user = $request->user();

        $request->validate([
            'tanggal_kunjungan' => 'required|date|after:now',
            'dokter_id' => 'required',
            'poli_id' => 'required',
            'keluarga_id' => 'required'
        ]);
        $pasien = Pasien::where('id', $request->keluarga_id)->first();

        $cekAntrian = AntrianPoli::whereDate('tanggal_kunjungan',  Carbon::parse($request->tanggal_kunjungan))
            ->where('pasien_id', '=', $pasien->id)
            ->where('status', '=', 'pending')
            ->first();
        if ($cekAntrian) {
            return redirect()->back();
        }
        $countAntrianPoli = AntrianPoli::whereDate('tanggal_kunjungan', '=', Carbon::parse($request->tanggal_kunjungan))->count() + 1;
        $booking = AntrianPoli::create([
            'kd_antrian' => 'P-0' . $countAntrianPoli,
            'pasien_id' => $pasien->id,
            'dokter_id' => $request->dokter_id,
            'poli_id' => $request->poli_id,
            'nik' => $pasien->nik,
            'bpjs' => $pasien->bpjs,
            'nama_pasien' => $pasien->nama,
            'jenis_kelamin' => $pasien->jenis_kelamin,
            'tanggal_lahir' => $pasien->tanggal_lahir,
            'umur' => 1,
            'alamat' => $pasien->alamat,
            'phone_number' => $pasien->phone_number,
            'tanggal_kunjungan' => $request->tanggal_kunjungan,
        ]);
    }
}
