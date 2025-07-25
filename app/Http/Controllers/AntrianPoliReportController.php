<?php

namespace App\Http\Controllers;

use App\Models\AntrianPoli;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class AntrianPoliReportController extends Controller
{
    /**
     * Show the report selection page for AntrianPoli.
     */
    public function index()
    {
        return inertia('Admin/Report/AntrianPoliReportPage');
    }

    /**
     * Generate report data for AntrianPoli based on type.
     */
    public function generate(Request $request)
    {
        $rules = [
            'report_type' => 'required|in:daily,monthly,yearly',
            'dokter_id' => 'nullable',
            'poli_id' => 'nullable',
        ];

        $reportType = $request->input('report_type');

        if ($reportType === 'daily') {
            $rules['date_from'] = 'required|date';
            $rules['date_to'] = 'required|date|after_or_equal:date_from';
        } elseif ($reportType === 'monthly') {
            $rules['month_from'] = 'required|integer|min:1|max:12';
            $rules['month_to'] = 'required|integer|min:1|max:12|gte:month_from';
            $rules['year'] = 'required|integer|min:1900|max:2100';
        } elseif ($reportType === 'yearly') {
            $rules['year'] = 'required|integer|min:1900|max:2100';
        }

        try {
            $request->validate($rules);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error in AntrianPoliReportController@generate', [
                'errors' => $e->errors(),
                'input' => $request->all(),
            ]);
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        $reportType = $request->input('report_type');
        $query = AntrianPoli::with(['dokter.user', 'poli']);
        $dateColumn = 'tanggal_kunjungan';

        switch ($reportType) {
            case 'daily':
                $startDate = $request->input('date_from');
                $endDate = $request->input('date_to');
                $query->whereBetween($dateColumn, [$startDate, $endDate]);
                break;
            case 'monthly':
                $monthFrom = $request->input('month_from');
                $monthTo = $request->input('month_to');
                $year = $request->input('year');
                $query->whereYear($dateColumn, $year)
                    ->whereMonth($dateColumn, '>=', $monthFrom)
                    ->whereMonth($dateColumn, '<=', $monthTo);
                break;
            case 'yearly':
                $year = $request->input('year');
                $query->whereYear($dateColumn, $year);
                break;
            default:
                return response()->json(['error' => 'Invalid report type'], 400);
        }

        if ($request->filled('poli_id') && $request->input('poli_id') != 'all') {
            $query->where('poli_id', $request->input('poli_id'));
        }

        if ($request->filled('dokter_id') && $request->input('dokter_id') != 'all') {
            $query->where('dokter_id', $request->input('dokter_id'));
        }

        $data = $query->get();

        $total = $data->count();

        // Map data to include poli name, dokter name, and created_at date
        $mappedData = $data->map(function ($item) {
            return [
                'id' => $item->id,
                'kd_antrian' => $item->kd_antrian,
                'nama_pasien' => $item->nama_pasien,
                'tanggal_kunjungan' => $item->tanggal_kunjungan,
                'status' => $item->status,
                'nama_poli' => $item->poli ? $item->poli->nama_poli : null,
                'nama_dokter' => $item->dokter && $item->dokter->user ? $item->dokter->user->name : null,
                'created_at' => $item->created_at->format('Y-m-d'),
            ];
        });

        return response()->json([
            'data' => $mappedData,
            'total' => $total,
            'report_type' => $reportType,
        ]);
    }

    /**
     * Get list of polis.
     */
    public function getPolis()
    {
        $polis = \App\Models\Poli::all(['id', 'nama_poli']);
        return response()->json($polis);
    }

    /**
     * Get list of dokters by poli.
     */
    public function getDoktersByPoli(Request $request)
    {
        $poliId = $request->input('poli_id');
        if (!$poliId || $poliId == 'all') {
            return response()->json([]);
        }
        $dokters = \App\Models\Dokter::where('poli_id', $poliId)
            ->with('user')
            ->get()
            ->map(function ($dokter) {
                return [
                    'id' => $dokter->id,
                    'name' => $dokter->user ? $dokter->user->name : 'Unknown',
                ];
            });
        return response()->json($dokters);
    }
}
