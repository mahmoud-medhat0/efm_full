<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class AgentRequest extends Model
{
    use HasFactory, LogsActivity;
    protected $guarded = [];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
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
