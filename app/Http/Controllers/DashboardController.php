<?php

namespace App\Http\Controllers;

use App\Models\Antrian;
use App\Models\AntrianPoli;
use App\Models\Dokter;
use App\Models\Pasien;
use App\Models\Poli;
use App\Models\RekamMedis;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $countDokter = Dokter::count();
        $countPoli = Poli::count();
        $countPasien = Pasien::count();
        $countAntrianPoli = AntrianPoli::whereDate('tanggal_kunjungan', now())->count();

        $polis = Poli::all();
        $colors = [
            '#3b82f6',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#8b5cf6',
            '#ec4899',
            '#14b8a6',
            '#f97316',
            '#84cc16',
            '#06b6d4',
            '#f43f5e',
            '#a3a3a3'
        ];

        // === Label bulan (Jan–Des)
        $months = collect(range(1, 12))->map(function ($m) {
            return \Carbon\Carbon::create()->month($m)->locale('id')->translatedFormat('F');
        });

        // === Dataset tahunan per poli
        $yearlyDatasets = [];
        foreach ($polis as $idx => $poli) {
            $counts = []; // akan diisi per bulan
            for ($m = 1; $m <= 12; $m++) {
                // hitung jumlah antrian untuk bulan & poli ini
                $jumlah = AntrianPoli::where('poli_id', $poli->id)
                    ->whereMonth('tanggal_kunjungan', $m)
                    ->whereYear('tanggal_kunjungan', now()->year)
                    ->count();
                $counts[] = $jumlah; // kalau tidak ada, otomatis 0
            }

            $yearlyDatasets[] = [
                'label' => $poli->nama_poli,
                'data' => $counts,
                'backgroundColor' => $colors[$idx % count($colors)],
                'borderColor' => $colors[$idx % count($colors)],
                'borderWidth' => 2,
                'tension' => 0.4,
                'fill' => false,
            ];
        }

        // === Dataset harian
        $dailyLabels = $polis->pluck('nama_poli');
        $dailyData = $polis->map(function ($poli) {
            return AntrianPoli::where('poli_id', $poli->id)
                ->whereDate('tanggal_kunjungan', now())
                ->count();
        });

        return inertia('Dashboard/Index', [
            'countDokter' => $countDokter,
            'countPoli' => $countPoli,
            'countPasien' => $countPasien,
            'countAntrianPoli' => $countAntrianPoli,
            'chartLabels' => $months,
            'chartYearlyDatasets' => $yearlyDatasets,
            'dailyLabels' => $dailyLabels,
            'dailyData' => $dailyData,
        ]);
    }
}
