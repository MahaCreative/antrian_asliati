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
        Schema::create('riwayat_pemeriksaans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('antrian_poli_id')->constrained('antrian_polis')->onDelete('cascade');
            $table->foreignId('dokter_id')->constrained('dokters')->onDelete('cascade');
            $table->foreignId('poli_id')->constrained('polis')->onDelete('cascade');
            $table->string('tekanan_darah');
            $table->string('denyut_nadi');
            $table->string('berat_badan');
            $table->string('tinggi_badan');
            $table->text('keluhan');
            $table->text('diagnosa');
            $table->text('tindakan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('riwayat_pemeriksaans');
    }
};
