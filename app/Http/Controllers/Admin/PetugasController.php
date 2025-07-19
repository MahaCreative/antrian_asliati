<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class PetugasController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->where('role', 'petugas');

        $petugas = $query->latest()->get();
        return inertia('Admin/Petugas/Index', compact('petugas'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "name" => 'required',
            "phone_number" => 'required|unique:users,phone_number|numeric|min_digits:10|max_digits:14',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|alpha_dash|min:6',
            "role" => 'required',
            "avatar" => 'required|image|mimes:jpg,jpeg,png',
        ]);
        $attr['avatar'] = $request->file('avatar')->store('petugas');
        $attr['password'] = bcrypt($request->password);
        $user = User::create($attr);
    }

    public function update(Request $request)
    {
        $petugas = User::find($request->id);
        $attr = $request->validate([
            "name" => 'required',
            "phone_number" => 'required|numeric|min_digits:10|max_digits:14|unique:users,phone_number,' . $petugas->id,
            "email" => 'required|email|unique:users,email,' . $petugas->id,
            "role" => 'required',

        ]);
        $attr['avatar'] = $petugas->avatar;
        $attr['password'] = $petugas->password;
        if ($request->hasFile('avatar')) {
            $request->validate(['avatar' => 'image|mimes:jpg,jpeg,png']);
            $attr['avatar'] = $request->file('avatar')->store('petugas');
        }
        if ($request->password) {
            $attr['password'] = bcrypt($request->password);
        }

        $petugas->update($attr);
    }

    public function delete(Request $request, $id)
    {
        $petugas = User::find($id);
        $petugas->delete();
    }
}
