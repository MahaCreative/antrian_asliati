<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileKlinikSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('profile_kliniks')->insert([
            'nama_klinik' => 'Klinik Hayyat',
            'logo_klinik' => 'Image/default_logo.png',
            'address' => 'Jl. Andi Makkassau Kel. Karema, Kec. Mamuju',
            'phone_number' => '085334703299',
            'keterangan' => 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed ipsum voluptate vitae eius illo iure optio. Omnis deleniti eius ipsa similique. Unde delectus sed asperiores soluta dolore error fugiat necessitatibus.'
        ]);
    }
}
