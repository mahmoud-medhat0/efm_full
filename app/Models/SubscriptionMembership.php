<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
class SubscriptionMembership extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $casts = ['start_date'=>'datetime','end_date'=>'datetime'];
    protected $appends = ['remaining_days','start_date_human','end_date_human','is_lifetime_human'];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function membership()
    {
        return $this->belongsTo(Membershib::class);
    }
    public function getStartDateHumanAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s A');
    }
    public function getEndDateHumanAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d H:i:s A');
    }
    public function getIsLifetimeHumanAttribute($value)
    {
        return $value ? 'Yes' : 'No';
    }
    public function getRemainingDaysAttribute()
    {
        if ($this->is_lifetime) {
            return 'Lifetime';
        }
        return Carbon::parse($this->end_date)->diffInDays(Carbon::now());
    }
}
