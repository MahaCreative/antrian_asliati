<?php

namespace App\Http\Controllers;

use App\Events\PemanggilanAntrianEvent;
use App\Models\Antrian;
use Illuminate\Http\Request;

class AntrianOfflineController extends Controller
{
    //
    public function index(Request $request)
    {
        return inertia('Admin/AmbilAntrianOffline/Index');
    }

    public function store(Request $request)
    {

        $countAntrian = Antrian::whereDate('created_at', '=', now())->count();

        $antrian = Antrian::create([
            'kd_antrian' => 'A-' . $countAntrian + 1,
            'poli_id' => $request->poli_id,
        ]);
        broadcast(new PemanggilanAntrianEvent($antrian))->toOthers();
        return response()->json(['antrian' => $antrian]);
    }
}
