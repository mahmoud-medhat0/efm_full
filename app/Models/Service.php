<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 
use Spatie\Activitylog\Traits\LogsActivity;

class Service extends Model
{
    use HasFactory,HasTranslations,LogsActivity;
    public $translatable = ['name'];
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
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function pending_tasks($client)
    {
        return $this->hasMany(Task::class)->where('status', 'pending')->where('client_id', $client->id);
    }
    public function completed_tasks($client)
    {
        return $this->hasMany(Task::class)->where('status', 'completed')->where('client_id', $client->id);
    }
    public function fields()
    {
        if($this->manual_fields){
            return TaskManualField::whereIn('id',json_decode($this->manual_fields))->get();
        }
        return null;
    }
}
