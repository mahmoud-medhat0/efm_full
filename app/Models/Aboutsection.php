<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\NovaTranslatable\Translatable;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class Aboutsection extends Model
{
    use HasFactory, LogsActivity,HasTranslations;
    protected $translatable = ['title', 'description'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->hasMany(Activity::class, 'causer_id', 'id');
    }
}
