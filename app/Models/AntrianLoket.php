<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AntrianLoket extends Model
{
    use HasFactory;

    protected $table = 'antrian_lokets';

    protected $fillable = [
        'nomor_antrian',
        'status',
        'poli_id',
        'pasien_id',
        'loket_id',
        'tipe_pasien'
    ];

    public function poli()
    {
        return $this->belongsTo(Poli::class, 'poli_id');
    }

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'pasien_id');
    }
}
