<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('antrian_polis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->foreignId('petugas_id')->nullable();
            $table->foreignId('dokter_id')->constrained()->onDelete('cascade');
            $table->foreignId('poli_id')->constrained()->onDelete('cascade');
            $table->string('nik');
            $table->string('bpjs')->nullable();
            $table->string('nama_pasien');
            $table->string('jenis_kelamin');
            $table->date('tanggal_lahir');
            $table->string('umur');
            $table->string('alamat');
            $table->string('phone_number');
            $table->string('status')->default('pending'); //pending, proses, cancel, selesai;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrian_polis');
    }
};
