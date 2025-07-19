<?php

namespace App\Http\Controllers;

use App\Events\AntrianPoliEvents;
use App\Models\AntrianPoli;
use App\Models\PanggilanAntrian;
use App\Models\Poli;
use Illuminate\Http\Request;

class AntrianPoliController extends Controller
{
    public function index(Request $request)
    {
        $tanggal = $request->tanggal ? $request->tanggal : now();
        $antrianPoli = AntrianPoli::with('poli', 'dokter', 'pasien')->whereDate('created_at', '=', $tanggal)
            ->get();

        return inertia('Admin/AntrianPoli/Index', compact('antrianPoli'));
    }

    public function update(Request $request)
    {

        $antrianPoli = AntrianPoli::find($request->antrian_id);
        $antrianPoli->update(['status' => $request->status]);
        $poli = Poli::find($antrianPoli->poli_id)->first();
        if ($request->status == 'called') {
            $panggilanAntrian = PanggilanAntrian::create([
                "kd_antrian" => $antrianPoli->kd_antrian,
                "jenis_antrian" => 'poli',
                "tujuan" => $poli->nama_poli,
                "nama" => $antrianPoli->nama_pasien,
            ]);
            broadcast(new AntrianPoliEvents($panggilanAntrian))->toOthers();
        }
    }
}
