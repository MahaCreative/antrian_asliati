<?php

namespace App\Http\Controllers;

use App\Models\Pasien;
use Carbon\Carbon;
use Illuminate\Http\Request;

class KeluargaController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $keluarga = Pasien::where('user_id', $user->id)->latest()->get();
        return inertia('Guset/Keluarga/Index', compact('keluarga'));
    }

    public function store(Request $request)
    {
        $request->validate([

            'name' => 'required|min:3|max:60|string',
            'phone_number' => 'nullable|numeric|min_digits:10|max_digits:14|unique:users,phone_number',

            'nik' => 'required|numeric|min_digits:10|max_digits:16|unique:pasiens,nik',
            'bpjs' => 'nullable|numeric|min_digits:10|max_digits:16|unique:pasiens,bpjs',
            'status' => 'required',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date|before:now',
            'alamat' => 'required|string|min:10',
        ]);
        $tanggal_lahir = Carbon::parse($request->tanggal_lahir);

        $pasien = Pasien::create([
            'user_id' => $request->user()->id,
            'nama' => $request->name,

            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'status' => $request->status,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
        ]);
    }

    public function update(Request $request)
    {

        $request->validate([

            'name' => 'required|min:3|max:60|string',
            'nik' => 'required|numeric|min_digits:10|max_digits:16|unique:pasiens,nik,' . $request->id,
            'bpjs' => 'nullable|numeric|min_digits:10|max_digits:16|unique:pasiens,bpjs,' . $request->id,
            'status' => 'required',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date|before:now',
            'alamat' => 'required|string|min:10',
        ]);
        $pasien = Pasien::find($request->id);
        $pasien->update([
            'nama' => $request->name,
            'nik' => $request->nik,
            'bpjs' => $request->bpjs,
            'status' => $request->status,
            'jenis_kelamin' => $request->jenis_kelamin,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
        ]);
    }

    public function delete(Request $request)
    {

        $pasien = Pasien::find($request->id)->update(['user_id' => null]);
    }
}
