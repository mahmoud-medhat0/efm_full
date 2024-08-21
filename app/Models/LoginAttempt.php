<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoginAttempt extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function authenticatable()
    {
        return $this->morphTo();
    }
}
