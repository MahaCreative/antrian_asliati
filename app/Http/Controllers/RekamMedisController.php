<?php

namespace App\Http\Controllers;

use App\Models\AntrianPoli;
use App\Models\Pasien;
use App\Models\RekamMedis;
use Illuminate\Http\Request;

class RekamMedisController extends Controller
{
    public function index($pasienId, $id_antrian)
    {
        $pasien = Pasien::findOrFail($pasienId);

        // ambil semua rekam medis pasien
        $rekamMedis = RekamMedis::with('dokter')
            ->where('pasien_id', $pasien->id)
            ->latest()
            ->get();

        return inertia('Admin/RekamMedis/ProsesAntrian', [
            'pasien' => $pasien,
            'rekamMedis' => $rekamMedis,
            'id_antrian' => $id_antrian,
        ]);
    }

    /**
     * Simpan rekam medis baru
     */
    public function store(Request $request, $pasienId)
    {
        $pasien = Pasien::findOrFail($pasienId);

        $validated = $request->validate([
            'keluhan'        => 'nullable|string',
            'pemeriksaan'    => 'nullable|string',
            'diagnosa'       => 'nullable|string',
            'rencana'        => 'nullable|string',
            'tindakan'       => 'nullable|string',
            'obat'           => 'nullable', // boleh string/array
            'hasil_penunjang' => 'nullable', // boleh string/array
            'tanggal'        => 'nullable|date',
            'id_antrian'     => 'required|exists:antrian_polis,id',
        ]);

        // update status antrian
        AntrianPoli::findOrFail($validated['id_antrian'])->update([
            'status' => 'selesai'
        ]);

        // jika obat string dipisah koma
        $obat = $validated['obat'];
        if (is_string($obat)) {
            $obat = array_filter(array_map('trim', explode(',', $obat)));
        }

        // jika hasil_penunjang berupa file upload
        $hasilPenunjang = [];
        if ($request->hasFile('hasil_penunjang')) {
            foreach ($request->file('hasil_penunjang') as $file) {
                $path = $file->store('hasil_penunjang', 'public');
                $hasilPenunjang[] = $path;
            }
        }

        RekamMedis::create([
            'pasien_id'       => $pasien->id,
            'dokter_id'       => auth()->user()->dokter->id, // pastikan ambil dokter login
            'tanggal'         => $validated['tanggal'] ?? now()->format('Y-m-d'),
            'keluhan'         => $validated['keluhan'],
            'pemeriksaan'     => $validated['pemeriksaan'],
            'diagnosa'        => $validated['diagnosa'],
            'rencana'         => $validated['rencana'],
            'tindakan'        => $validated['tindakan'],
            'obat'            => $obat,
            'hasil_penunjang' => $hasilPenunjang,
        ]);

        return back()->with('success', 'Rekam medis berhasil disimpan.');
    }


    /**
     * Update rekam medis
     */
    public function update(Request $request, $id)
    {
        $rekamMedis = RekamMedis::findOrFail($id);

        $request->validate([
            'keluhan' => 'required|string',
            'diagnosa' => 'required|string',
            'tindakan' => 'nullable|string',
            'resep_obat' => 'nullable|string',
        ]);

        $rekamMedis->update([

            'keluhan' => $request->keluhan,
            'diagnosa' => $request->diagnosa,
            'tindakan' => $request->tindakan,
            'obat' => $request->resep_obat,
        ]);

        return back()->with('success', 'Rekam medis berhasil diperbarui.');
    }

    /**
     * Hapus rekam medis
     */
    public function destroy($id)
    {
        $rekamMedis = RekamMedis::findOrFail($id);
        $rekamMedis->delete();

        return back()->with('success', 'Rekam medis berhasil dihapus.');
    }
}
