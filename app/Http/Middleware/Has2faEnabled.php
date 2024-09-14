<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Has2faEnabled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        
        if (session('2fa_verified')) {
            return redirect()->route('client.dashboard');
        }
        if (auth()->user()->is_2a) {
            return $next($request);
        }
        return redirect()->route('client.2fa');
    }
}
