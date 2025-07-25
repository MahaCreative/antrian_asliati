<?php

use App\Http\Controllers\Admin\AntrianOfflineController as AdminAntrianOfflineController;
use App\Http\Controllers\Admin\BackgroundAntrianController;
use App\Http\Controllers\Admin\DokterController;
use App\Http\Controllers\Admin\JadwalDokterController;
use App\Http\Controllers\Admin\LoketController;
use App\Http\Controllers\Admin\PasienController;
use App\Http\Controllers\Admin\PetugasController;
use App\Http\Controllers\Admin\PoliController;
use App\Http\Controllers\Admin\ProfileKlinikController;
use App\Http\Controllers\AntrianOfflineController;
use App\Http\Controllers\AntrianPoliController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingAntrianController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KeluargaController;
use App\Http\Controllers\RekamMedisController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('', [HomeController::class, 'index'])->name('home');
Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::post('login', [AuthController::class, 'store_login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('register');
    Route::post('register', [AuthController::class, 'store_register'])->name('register');
});

Route::middleware(['auth'])->group(function () {
    Route::get('logout', [AuthController::class, 'logout'])->name('logout');
    Route::get('profile', [AuthController::class, 'profile'])->name('profile');
    Route::post('profile', [AuthController::class, 'profile_update'])->name('profile');
    Route::get('booking-antrian', [BookingAntrianController::class, 'index'])->name('booking-antrian');
    Route::post('/cek-jumlah-antrian', [BookingAntrianController::class, 'getJumlahAntrian'])
        ->name('cek-jumlah-antrian');
    Route::get('history-antrian', [BookingAntrianController::class, 'history'])->name('history-antrian');
    Route::post('store-booking-antrain', [BookingAntrianController::class, 'store'])->name('store-booking-antrian');
    Route::get('kelola-data-keluarga', [KeluargaController::class, 'index'])->name('data-keluarga');
    Route::post('post-data-keluarga', [KeluargaController::class, 'store'])->name('store-data-keluarga');
    Route::post('update-data-keluarga', [KeluargaController::class, 'update'])->name('update-data-keluarga');
    Route::delete('delete-data-keluarga', [KeluargaController::class, 'delete'])->name('delete-data-keluarga');
});

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

// Admin
Route::get('admin/kelola-profile-klinik', [ProfileKlinikController::class, 'index'])->name('admin.profile-klinik');
Route::post('admin/update-profile-klinik', [ProfileKlinikController::class, 'store'])->name('admin.update-profile-klinik');

Route::get('admin/kelola-poli-klinik', [PoliController::class, 'index'])->name('admin.kelola-poli');
Route::post('admin/store-poli-klinik', [PoliController::class, 'store'])->name('admin.store-poli');
Route::post('admin/update-poli-klinik', [PoliController::class, 'update'])->name('admin.update-poli');
Route::post('admin/delete-poli-klinik/{id}', [PoliController::class, 'delete'])->name('admin.delete-poli');

Route::get('admin/kelola-dokter', [DokterController::class, 'index'])->name('admin.kelola-dokter');
Route::post('admin/store-dokter', [DokterController::class, 'store'])->name('admin.store-dokter');
Route::post('admin/update-dokter', [DokterController::class, 'update'])->name('admin.update-dokter');
Route::post('admin/delete-dokter/{id}', [DokterController::class, 'delete'])->name('admin.delete-dokter');

Route::get('admin/kelolad-jadwal-dokter', [JadwalDokterController::class, 'index'])->name('admin.kelolad-jadwal-dokter');
Route::post('admin/store-jadwal-dokter', [JadwalDokterController::class, 'store'])->name('admin.store-jadwal-dokter');
Route::post('admin/update-jadwal-dokter', [JadwalDokterController::class, 'update'])->name('admin.update-jadwal-dokter');
Route::post('admin/delete-jadwal-dokter/{id}', [JadwalDokterController::class, 'delete'])->name('admin.delete-jadwal-dokter');

Route::get('admin/kelola-petugas', [PetugasController::class, 'index'])->name('admin.kelola-petugas');
Route::post('admin/store-kelola-petugas', [PetugasController::class, 'store'])->name('admin.store-petugas');
Route::post('admin/update-kelola-petugas', [PetugasController::class, 'update'])->name('admin.update-petugas');
Route::post('admin/delete-kelola-petugas/{id}', [PetugasController::class, 'delete'])->name('admin.delete-petugas');



Route::get('admin/kelola-antrian-poli', [AntrianPoliController::class, 'index'])->name('admin.antrian-poli');
Route::post('admin/panggil-antrian-poli', [AntrianPoliController::class, 'update'])->name('admin.panggil-antrian-poli');

Route::get('admin/data-pasien', [PasienController::class, 'index'])->name('admin.kelola-pasien');



// dokter
Route::middleware(['auth',])->group(function () {
    Route::get('/proses-antrian/{pasien}/{id_antrian}', [RekamMedisController::class, 'index'])->name('proses-antrian.index');
    Route::post('/store-proses-antrian/{pasien}', [RekamMedisController::class, 'store'])->name('proses-antrian.store');
    Route::put('/rekam-medis/{rekamMedis}', [RekamMedisController::class, 'update'])->name('rekam-medis.update');
    Route::delete('/rekam-medis/{rekamMedis}', [RekamMedisController::class, 'destroy'])->name('rekam-medis.destroy');
});
