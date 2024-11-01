<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgentRequest extends Model
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
    
    public static function boot()
    {
        parent::boot();
        static::updating(function ($model) {
            
            $attributes = $model->getAttributes();
            $incomingAttributes = request()->all();
            $filteredAttributes = [];
            foreach($incomingAttributes as $key => $value){
                if(array_key_exists($key, $attributes)){
                    $filteredAttributes[$key] = $value;
                }
            }
            $model->fill($filteredAttributes);
        });
    }
}
