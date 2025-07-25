<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function poli()
    {
        return $this->belongsTo(Poli::class);
    }
    public function jadwal()
    {
        return $this->hasMany(JadwalDokter::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
