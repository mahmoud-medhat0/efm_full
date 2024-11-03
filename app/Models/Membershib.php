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
    public function getsubscriptionMembershipsAttribute()
    {
        return $this->is_lifetime ? true : false;
    }
    public function getIsLifetimeAttribute($value)
    {
        return $value ? 'Yes' : 'No';
    }
    public function getDurationAttribute()
    {
        return $this->is_lifetime ? 'Lifetime' : $this->days . ' day(s)';
    }
}
