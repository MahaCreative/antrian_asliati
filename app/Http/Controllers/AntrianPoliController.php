<?php

namespace App\Http\Controllers;

use App\Events\AntrianPoliEvents;
use App\Models\AntrianPoli;
use App\Models\Dokter;
use App\Models\PanggilanAntrian;
use App\Models\Poli;
use Illuminate\Http\Request;

class AntrianPoliController extends Controller
{
    public function index(Request $request)
    {


        $dokter = Dokter::where('user_id', $request->user()->id)->first();

        $antrianPoli = AntrianPoli::with('poli', 'dokter', 'pasien')
            ->where('dokter_id', $dokter->id)
            ->where('status', '!=', 'selesai')
            // ->whereDate('tanggal_kunjungan', '=', $tanggal)
            ->get();

        return inertia('Admin/AntrianPoli/Index', compact('antrianPoli'));
    }
}
