<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HandleAntrianErrors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $response = $next($request);

            if ($response->status() >= 400) {
                Log::warning('Antrian API Error', [
                    'url' => $request->fullUrl(),
                    'method' => $request->method(),
                    'status' => $response->status(),
                    'user_id' => $request->user()?->id,
                    'ip' => $request->ip(),
                ]);
            }

            return $response;
        } catch (\Exception $e) {
            Log::error('Antrian System Error', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'url' => $request->fullUrl(),
                'user_id' => $request->user()?->id,
                'ip' => $request->ip(),
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'error' => 'Terjadi kesalahan pada sistem',
                    'message' => 'Silakan coba lagi nanti'
                ], 500);
            }

            throw $e;
        }
    }
}
