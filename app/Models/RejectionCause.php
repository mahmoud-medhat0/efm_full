<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 
use Spatie\Activitylog\Traits\LogsActivity;

class RejectionCause extends Model
{
    use HasFactory,HasTranslations,LogsActivity;
    public $translatable = ['name','description'];
    protected $guarded = [];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
}
