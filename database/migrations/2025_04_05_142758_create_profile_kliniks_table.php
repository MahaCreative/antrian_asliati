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
        Schema::create('profile_kliniks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_klinik');
            $table->string('logo_klinik');
            $table->string('address');
            $table->string('phone_number');
            $table->string('keterangan');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profile_kliniks');
    }
};
