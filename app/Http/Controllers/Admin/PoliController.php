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
            'nama_poli' => 'required|string|min:3|unique:polis,nama_poli',
            'keterangan' => 'required|string|min:3',
        ]);

        // hitung jumlah poli sudah ada
        $count = Poli::count() + 1;

        // buat kode poli p-001
        $attr['kd_poli'] = 'p-' . str_pad($count, 3, '0', STR_PAD_LEFT);

        // buat kode antrian a, b, c, ...
        $alphabet = range('a', 'z');
        if ($count <= count($alphabet)) {
            $attr['kd_antrian'] = $alphabet[$count - 1]; // karena index mulai dari 0
        } else {
            // jika melebihi 26, misalnya pakai kombinasi, contoh sederhana:
            $first = $alphabet[intdiv($count - 1, 26) - 1] ?? '';
            $second = $alphabet[($count - 1) % 26];
            $attr['kd_antrian'] = $first . $second; // aa, ab, dst
        }

        $poli = Poli::create($attr);

        broadcast(new GlobalEvents($poli))->toOthers();
    }

    public function update(Request $request)
    {
        $attr = $request->validate([

            'nama_poli' => 'required|string|min:3|unique:polis,nama_poli',
            'keterangan' => 'required|string|min:3',
        ]);
        $poli = Poli::find($request->id);
        $poli->update($attr);
        broadcast(new GlobalEvents($poli))->toOthers();
    }

    public function delete(Request $request, $id)
    {
        Poli::findOrFail($id)->delete();

        // re-index ulang
        $polis = Poli::orderBy('id')->get();
        $alphabet = range('a', 'z');

        foreach ($polis as $index => $poli) {
            $poli->kd_poli = 'p-' . str_pad($index + 1, 3, '0', STR_PAD_LEFT);
            $poli->kd_antrian = $alphabet[$index];
            $poli->save();
        }

        return back()->with('success', 'Poli berhasil dihapus dan kode diperbarui.');
        broadcast(new GlobalEvents(null))->toOthers();
    }
}
