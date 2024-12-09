<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 
use Spatie\Activitylog\Traits\LogsActivity;

class TaskManualField extends Model
{
    use HasFactory,HasTranslations,LogsActivity;
    protected $translatable = ['name'];
    public function getNameEnAttribute()
    {
        return $this->getTranslation('name', 'en');
    }
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
}