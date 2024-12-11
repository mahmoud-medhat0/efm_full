<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\Models\Activity; 
use Spatie\Activitylog\LogOptions;
class Task extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $appends = ['rejection_cause_name'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function service()
    {
        return $this->belongsTo(Service::class);
    }
    public function notRemoved()
    {
        return $this->where('removed', false);
    }
    public function reward()
    {
        if($this->order->order_type == 'custom_time'){
            return (float) number_format($this->service->reward_point * (($this->order->time_end - $this->order->time_start) / 60), 2, '.', '');
        }else if($this->service->service_code == 'yt_videos'){
            return (float) number_format($this->service->reward_point * (json_decode($this->order->data, true)['minutes'] ?? 0), 2, '.', '');
        }else{
            return $this->service->reward_point;
        }
    }
    public function banAttemps()
    {
        return $this->hasMany(BanAttemp::class);
    }
    public function rejectionCause()
    {
        return $this->belongsTo(TaskRejectionCause::class);
    }
    public function getRejectionCauseNameAttribute()
    {
        return $this->rejectionCause ? $this->rejectionCause->name : null;
    }
}