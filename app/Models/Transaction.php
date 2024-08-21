<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 

class Transaction extends Model
{
    use HasFactory, LogsActivity;
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
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
    public function gateway()
    {
        return $this->belongsTo(Gateways::class, 'gateway_id');
    }
    public function deposits()
    {
        return $this->where('type', 'deposit')->get();
    }
    public function withdrawals()
    {
        return $this->where('type', 'withdrawal')->get();
    }
}
