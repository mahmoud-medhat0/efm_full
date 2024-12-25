<?php

use Illuminate\Support\Facades\Http;
if (!function_exists('iso8601ToDuration')) {
    function iso8601ToDuration($iso8601Duration)
    {
        try {
            $interval = new DateInterval($iso8601Duration);
        } catch (Exception $e) {
            return "Invalid duration string";
        }

        $hours = $interval->h;
        $minutes = $interval->i;
        $seconds = $interval->s;

        // Convert days to hours if applicable
        if ($interval->d > 0) {
            $hours += $interval->d * 24;
        }

        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
    }
}
if (!function_exists('DetectIp')) {
    function DetectIp()
    {
        $response = Http::get('https://api.isproxyip.com/v1/check.php?key=HVERDuTrMt3OWGobA8HT6x0BpXqURIAkKdUMw8FJjFYdnGDaxe&ip=' . request()->ip());
        $data = $response->json();
        return $data['proxy'];
    }
}

