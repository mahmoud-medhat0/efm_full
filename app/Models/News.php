<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 
use Bolechen\NovaActivitylog\Resources\ActivityLog;

class News extends Model
{
    use HasFactory,HasTranslations,LogsActivity;
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public $translatable = ['title','description'];
    protected $fillable = ['title','description','published_at'];
    protected $casts = ['published_at' => 'datetime'];
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
}
