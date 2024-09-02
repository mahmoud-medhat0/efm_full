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
        return $this->service->reward_point*(json_decode($this->order->data,true)['minutes']??0);
    }
    public function banAttemps()
    {
        return $this->hasMany(BanAttemp::class);
    }
}
