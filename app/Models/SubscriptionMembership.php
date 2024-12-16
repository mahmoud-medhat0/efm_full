<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\Models\Activity; 
use Spatie\Activitylog\LogOptions;
class SubscriptionMembership extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $casts = ['start_date'=>'datetime','end_date'=>'datetime'];
    protected $appends = ['remaining_days','start_date_human','end_date_human','is_lifetime_human'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
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
    public function scopeFirstHalf($query)
    {
        return $query->where('is_lifetime',true)->whereRaw('DAY(start_date) > 14');
    }
    public function scopeSecondHalf($query)
    {
        return $query->where('is_lifetime',true)->whereRaw('DAY(start_date) <= 14');
    }
}
