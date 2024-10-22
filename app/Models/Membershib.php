<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Membershib extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function subscriptionMemberships()
    {
        return $this->hasMany(SubscriptionMembership::class);
    }
    public function getIsLifetimeAttribute($value)
    {
        return $value ? 'Yes' : 'No';
    }
}
