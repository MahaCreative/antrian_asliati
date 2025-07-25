<?php

namespace App\Http\Middleware;

use App\Models\AntrianPoli;
use App\Models\BackgroundAntrian;
use App\Models\Dokter;
use App\Models\JadwalDokter;
use App\Models\Loket;
use App\Models\Poli;
use App\Models\ProfileKlinik;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        $antrian = AntrianPoli::where('status', '=', 'pending')->whereDate('tanggal_kunjungan', '<=', now())->latest()->get();
        foreach ($antrian as $item) {
            $item->update(['status' => 'cancell']);
        }

        return [
            ...parent::share($request),
            'profile_klinik' => ProfileKlinik::first(),

            'dokter' => Dokter::with('poli')->latest()->get(),
            'jadwalDokter' => JadwalDokter::with('dokter')->latest()->get(),
            'poli' => Poli::latest()->get(),

            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
