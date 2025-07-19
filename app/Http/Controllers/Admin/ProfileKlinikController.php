<?php

namespace App\Http\Controllers\Admin;

use App\Events\GlobalEvents;
use App\Http\Controllers\Controller;
use App\Models\ProfileKlinik;
use Illuminate\Http\Request;

class ProfileKlinikController extends Controller
{
    public function index(Request $request)
    {
        $profile = ProfileKlinik::first();

        return inertia('Admin/ProfileKlinik/Index', compact('profile'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nama_klinik' => 'required|string|min:3|max:50',
            'address' => 'required|string|min:3|max:255',
            'phone_number' => 'required|numeric|min_digits:11|max_digits:12',
        ]);

        if ($request->hasFile('logo_klinik')) {
            $request->validate(['logo_klinik' => 'image|mimes:jpg,jpeg,png']);
            $attr['logo_klinik'] = $request->file('logo_klinik')->store('logo_klinik');
        }
        $profile = ProfileKlinik::first();
        $profile->update($attr);
        broadcast(new GlobalEvents($profile))->toOthers();
        return redirect()->back()->with(['type' => 'success', 'message' => 'profile telah berhasil diperbaharui']);
    }
}
