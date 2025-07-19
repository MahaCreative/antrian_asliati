<?php

namespace App\Http\Controllers\Admin;

use App\Events\GlobalEvents;
use App\Http\Controllers\Controller;
use App\Models\Dokter;
use App\Models\Poli;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DokterController extends Controller
{
    public function index(Request $request)
    {
        $query = Dokter::query()->with('poli', 'user');
        $dokter = $query->latest()->get();
        return inertia('Admin/Dokter/Index', compact('dokter'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nip' => 'required|numeric|min_digits:6|max_digits:12|unique:dokters,nip',
            'poli_id' => 'required',
            'nama_lengkap' => 'required|string',
            'keterangan' => 'required|string',
            'no_hp' => 'required|min_digits:10|max_digits:13|unique:dokters,no_hp',
            'avatar' => 'required|image|mimes:jpg,jpeg,png',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);
        $attr['avatar'] = $request->file('avatar')->store('dokter');
        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $request->nama_lengkap,
                'phone_number' => $request->no_hp,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => 'dokter',
                'avatar' => $attr['avatar'],
            ]);
            $poli = Poli::where('nama_poli', $request->poli_id)->first();
            $attr['poli_id'] = $poli->id;

            $dokter = Dokter::create([
                'user_id' => $user->id,
                'nip' => $attr['nip'],
                'poli_id' => $attr['poli_id'],
                'nama_lengkap' => $attr['nama_lengkap'],
                'keterangan' => $attr['keterangan'],
                'no_hp' => $attr['no_hp'],
                'avatar' => $attr['avatar'],
            ]);
            broadcast(new GlobalEvents($dokter))->toOthers();
            DB::commit();
        } catch (\Exception $e) {
            dd($e);
            DB::rollBack();
        }
    }

    public function update(Request $request)
    {
        $dokter = Dokter::find($request->id);
        $user = User::find($dokter->user_id);
        $attr = $request->validate([
            'nip' => 'required|numeric|min_digits:6|max_digits:12|unique:dokters,nip,' . $dokter->id,
            'poli_id' => 'required',
            'nama_lengkap' => 'required|string',
            'keterangan' => 'required|string',
            'no_hp' => 'required|min_digits:10|max_digits:13|unique:dokters,no_hp,' . $dokter->id,
            'email' => 'required|email|unique:users,email,' . $user->id
        ]);
        $password = $user->password;
        if ($request->password) {
            $request->validate(['password' => 'required|string|min:6']);
            $password = bcrypt($request->password);
        }
        $poli = Poli::where('nama_poli', $request->poli_id)->first();
        $attr['poli_id'] = $poli->id;
        $attr['avatar'] = $dokter->avatar;
        if ($request->hasFile('avatar')) {
            $attr['avatar'] = $request->file('avatar')->store('dokter');
        }
        $dokter->update([
            'nip' => $attr['nip'],
            'poli_id' => $attr['poli_id'],
            'nama_lengkap' => $attr['nama_lengkap'],
            'keterangan' => $attr['keterangan'],
            'no_hp' => $attr['no_hp'],
            'avatar' => $attr['avatar'],
        ]);
        $user->update([
            'email' => $request->email,
            'password' => $password
        ]);
        broadcast(new GlobalEvents($dokter))->toOthers();
    }

    public function delete(Request $request, $id)
    {
        $dokter = Dokter::find($id);
        $dokter->delete();
        broadcast(new GlobalEvents(null))->toOthers();
    }
}
