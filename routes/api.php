<?php

use App\Models\Pasien;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('get-data-pasien/{nik}', function ($nik) {
    $pasien = Pasien::where('nik', $nik)->first();
    return response()->json(['pasien' => $pasien]);
});
