<?php

namespace App\Http\Controllers\Admin;

use App\Events\GlobalEvents;
use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\JadwalDokter;
use Illuminate\Http\Request;

class JadwalDokterController extends Controller
{
    public function index(Request $request)
    {
        $query = JadwalDokter::query()->with(['dokter' => function ($q) {
            $q->with('poli');
        }]);

        $jadwal = $query->latest()->get();
        return inertia('Admin/JadwalDokter/Index', compact('jadwal'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'dokter_id' => 'required|string',
            'hari' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);
        $dokter = Dokter::where('nama_lengkap', $request->dokter_id)->first();
        $jadwal = JadwalDokter::create([
            "dokter_id" => $dokter->id,
            "hari" => $request->hari,
            "start_time" => $request->start_time,
            "end_time" => $request->end_time,
        ]);
        broadcast(new GlobalEvents($jadwal))->toOthers();
    }
    public function update(Request $request)
    {
        $request->validate([
            'dokter_id' => 'required|string',
            'hari' => 'required|string',
            'start_time' => 'required',
            'end_time' => 'required',
        ]);
        $jadwal = JadwalDokter::find($request->id);
        $dokter = Dokter::where('nama_lengkap', $request->dokter_id)->first();
        $jadwal->update([
            "dokter_id" => $dokter->id,
            "hari" => $request->hari,
            "start_time" => $request->start_time,
            "end_time" => $request->end_time,
        ]);
        broadcast(new GlobalEvents($jadwal))->toOthers();
    }

    public function delete(Request $request, $id)
    {
        $jadwal = JadwalDokter::find($id);
        $jadwal->delete();
        broadcast(new GlobalEvents(null))->toOthers();
    }
}
