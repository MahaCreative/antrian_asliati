<?php

namespace App\Http\Controllers;

use App\Events\RegiseterEvents;
use App\Models\Pasien;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function login(Request $request)
    {
        return inertia('Guset/Login/Index');
    }

    public function store_login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        $credentials = $request->only(['email', 'password']);
        if (Auth::attempt($credentials)) {
            $user = User::where('email', $request->email)->first();
            if ($user->role !== 'pasien') {
                return redirect()->route('dashboard');
            } else {
                return redirect()->route('home');
            }
        }
        return redirect()->back()->withErrors(['email' => 'invalid Email or Password']);
    }
    public function register(Request $request)
    {
        return inertia('Guset/Register/Index');
    }

    public function store_register(Request $request)
    {

        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|alpha_dash|min:6',
            'name' => 'required|min:3|max:60|string',
            'phone_number' => 'required|numeric|min_digits:10|max_digits:14|unique:users,phone_number',
            'avatar' => 'required|image|mimes:jpg,jpeg,png',
            'nik' => 'required|numeric|min_digits:10|max_digits:16|unique:pasiens,nik',
            'bpjs' => 'nullable|numeric|min_digits:10|max_digits:16|unique:pasiens,bpjs',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date|before:now',
            'alamat' => 'required|string|min:10',
        ]);
        $avatar = $request->file('avatar')->store('pasien');
        $user = User::create([
            "name" => $request->name,
            "phone_number" => $request->phone_number,
            "email" => $request->email,
            "password" => bcrypt($request->password),
            "role" => 'pasien',
            "avatar" => $avatar,
        ]);
        $tanggal_lahir = Carbon::parse($request->tanggal_lahir);
        $hari_ini = Carbon::now();
        $pasien = Pasien::create([
            "user_id" => $user->id,
            "nik" => $request->nik,
            "bpjs" => $request->bpjs,
            "nama" => $request->name,
            "jenis_kelamin" => $request->jenis_kelamin,
            "tanggal_lahir" => $request->tanggal_lahir,

            "alamat" => $request->alamat,
            "phone_number" => $request->phone_number,
            'status' => 'pribadi'
        ]);
        Auth::login($user);

        broadcast(new RegiseterEvents($user))->toOthers();
        return redirect()->route('home');
    }

    public function logout(Request $request)
    {

        Auth::logout();
        return redirect()->route('home');
    }

    public function profile(Request $request)
    {
        if ($request->user()->role == 'pasien') {
            $user = User::with('pasien')->find($request->user()->id);

            return inertia('Guset/Profile/Index', compact('user'));
        }
    }

    public function profile_update(Request $request)
    {
        $user = User::find($request->id);
        $pasien = Pasien::where('user_id', $user->id)->first();
        $request->validate([
            'email' => 'required|email|unique:users,email',

            'name' => 'required|min:3|max:60|string',
            'phone_number' => 'required|numeric|min_digits:10|max_digits:14|unique:users,phone_number',
            'nik' => 'required|numeric|min_digits:10|max_digits:16|unique:pasiens,nik',
            'bpjs' => 'required|numeric|min_digits:10|max_digits:16|unique:pasiens,bpjs',
            'jenis_kelamin' => 'required',
            'tanggal_lahir' => 'required|date|before:now',
            'alamat' => 'required|string|min:10',
        ]);
        $password = $user->password;
        $avatar = $request->avatar;
        if ($request->password) {
            $request->validate(['password' => 'required|alpha_dash|min:6']);
            $password = bcrypt($request->password);
        }
        if ($request->hasFile('avatar')) {
            $request->validate([
                'avatar' => 'required|image|mimes:jpg,jpeg,png',
            ]);
            $avatar = $request->file('avatar')->store('pasien');
        }
        $user->update([
            "name" => $request->name,
            "phone_number" => $request->phone_number,
            "email" => $request->email,
            "password" => $password,
            "role" => 'pasien',
            "avatar" => $avatar,
        ]);
        $pasien->update([
            "nik" => $request->nik,
            "bpjs" => $request->bpjs,
            "nama" => $request->name,
            "jenis_kelamin" => $request->jenis_kelamin,
            "tanggal_lahir" => $request->tanggal_lahir,
            "umur" => 1,
            "alamat" => $request->alamat,
            "phone_number" => $request->phone_number,
        ]);
    }
}
