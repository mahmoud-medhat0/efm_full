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
    public function getDurationAttribute()
    {
        return $this->is_lifetime ? 'Lifetime' : $this->days . ' day(s)';
    }
    public function getLevelsReferralCommissionsAttribute()
    {
        $ids = json_decode($this->level_referral_commission, true);
        $levelReferralCommissions = [];
        foreach ($ids as $id) {
            $levelReferralCommissions[$id]['level'] = LevelReferralCommision::where('id', $id)->first()->level;
            $levelReferralCommissions[$id]['percentage'] = LevelReferralCommision::where('id', $id)->first()->percentage;
        }
        return $levelReferralCommissions;
    }
}
