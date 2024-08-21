<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;

class WithdrawAccount extends Model
{
    use HasFactory, LogsActivity;
    protected $guarded = [];
    protected $casts = [
        'data' => 'array',
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
    public function gateway()
    {
        return $this->belongsTo(Gateways::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
