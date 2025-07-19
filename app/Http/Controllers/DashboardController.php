<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\AntrianPoli;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->date ? $request->date : now();
        $countPoli = Poli::count();
        $countDokter = Dokter::count();
        $countPasien = Pasien::count();

        $countAntrianPoli = AntrianPoli::whereDate('created_at', '=', $date)->count();
        return inertia('Dashboard/Index', compact(
            'countPoli',
            'countDokter',
            'countPasien',

            'countAntrianPoli',
        ));
    }
}
