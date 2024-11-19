<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class LoginAttempt extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = [
        'created_at' => 'datetime',
    ];
    protected $appends = ['created_at_human'];
    public function authenticatable()
    {
        return $this->morphTo();
    }
    public function getCreatedAtHumanAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y h:i:s A');
    }
}
