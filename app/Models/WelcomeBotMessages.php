<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WelcomeBotMessages extends Model
{
    use HasFactory;
    protected $fillable = ['message_id', 'status'];
}
