<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;

class FaqQuestion extends Model
{
    use HasFactory, HasTranslations, LogsActivity;

    public $translatable = ['question', 'answer'];
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
