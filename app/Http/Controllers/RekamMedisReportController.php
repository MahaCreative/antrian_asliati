<?php

namespace App\Http\Controllers;

use App\Models\RekamMedis;
use Illuminate\Http\Request;

class RekamMedisReportController extends Controller
{
    /**
     * Show the report selection page for RekamMedis.
     */
    public function index()
    {
        return inertia('Admin/Report/RekamMedisReportPage');
    }

    /**
     * Generate report data for RekamMedis based on type.
     */
    public function generate(Request $request)
    {
        $rules = [
            'report_type' => 'required|in:daily,monthly,yearly',
            'dokter_id' => 'nullable',
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

        $request->validate($rules);

        $query = RekamMedis::with(['pasien', 'dokter.user']);
        $dateColumn = 'tanggal';

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

        if ($request->filled('dokter_id') && $request->input('dokter_id') != 'all') {
            $query->where('dokter_id', $request->input('dokter_id'));
        }

        $data = $query->get();

        $total = $data->count();

        return response()->json([
            'data' => $data,
            'total' => $total,
            'report_type' => $reportType,
        ]);
    }

    /**
     * Get list of doctors with user names.
     */
    public function getDoctors()
    {
        $doctors = \App\Models\Dokter::with('user')->get()->map(function ($dokter) {
            return [
                'id' => $dokter->id,
                'name' => $dokter->user ? $dokter->user->name : 'Unknown',
            ];
        });

        return response()->json($doctors);
    }

    /**
     * Show the print page for Rekam Medis report.
     */
    public function print()
    {
        return inertia('Admin/Report/RekamMedisPrintPage');
    }
}
