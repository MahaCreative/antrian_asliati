<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pasien;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    public function index(Request $request)
    {
        $query = Pasien::query();
        $pasien = $query->latest()->get();
        return inertia('Admin/Pasien/Index', compact('pasien'));
    }
}
