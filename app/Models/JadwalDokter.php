<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalDokter extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function dokter()
    {
        return $this->belongsTo(Dokter::class);
    }
}
