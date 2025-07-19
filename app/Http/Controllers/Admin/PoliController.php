<?php

namespace App\Http\Controllers\Admin;

use App\Events\GlobalEvents;
use App\Http\Controllers\Controller;
use App\Models\Poli;
use Illuminate\Http\Request;

class PoliController extends Controller
{
    public function index(Request $request)
    {
        $poli = Poli::latest()->get();
        return inertia('Admin/Poli/Index', compact('poli'));
    }

    public function store(Request $request)
    {
        $attr = $request->validate([
            'kd_poli' => 'required|string|min:3|max:6|unique:polis,kd_poli',
            'nama_poli' => 'required|string|min:3|unique:polis,nama_poli',
            'keterangan' => 'required|string|min:3',
        ]);
        $poli = Poli::create($attr);
        broadcast(new GlobalEvents($poli))->toOthers();
    }
    public function update(Request $request)
    {
        $attr = $request->validate([
            'kd_poli' => 'required|string|min:3|max:6|unique:polis,kd_poli',
            'nama_poli' => 'required|string|min:3|unique:polis,nama_poli',
            'keterangan' => 'required|string|min:3',
        ]);
        $poli = Poli::find($request->id);
        $poli->update($attr);
        broadcast(new GlobalEvents($poli))->toOthers();
    }

    public function delete(Request $request, $id)
    {
        $poli = Poli::find($id);
        $poli->delete();
        broadcast(new GlobalEvents(null))->toOthers();
    }
}
