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
        Schema::create('rekam_medis', function (Blueprint $table) {
            $table->id();

            $table->foreignId('pasien_id')->constrained('pasiens')->onDelete('cascade');
            $table->foreignId('dokter_id')->constrained('dokters')->onDelete('cascade');
            $table->date('tanggal'); // tanggal pemeriksaan
            $table->text('keluhan')->nullable(); // S
            $table->text('pemeriksaan')->nullable(); // O
            $table->text('diagnosa')->nullable(); // A
            $table->text('rencana')->nullable(); // P
            $table->text('tindakan')->nullable(); // tindakan medis
            $table->json('obat')->nullable(); // simpan array nama obat
            $table->json('hasil_penunjang')->nullable(); // simpan hasil lab/radiologi (bisa berupa path file atau json)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rekam_medis');
    }
};
