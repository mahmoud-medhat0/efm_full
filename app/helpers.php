<?php
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
