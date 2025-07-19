<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $this->call(
            ProfileKlinikSeeder::class,
        );
        User::create([
            'name' => 'petugas',
            'phone_number' => '085334703299',
            'email' => 'petugas1@gmail.com',
            'password' => bcrypt('password'),
            'role' => 'petugas',
            'avatar' => 'asdfasdf',
        ]);
    }
}
