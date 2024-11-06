<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;

class TicketMessage extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $appends = ['created_at_human','image_url'];
    public function ticket(){
        return $this->belongsTo(Ticket::class);
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
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function getCreatedAtHumanAttribute($value)
    {
        return Carbon::parse($value)->format('Y-m-d h:i:s A');
    }
    public function getImageUrlAttribute()
    {
        return asset('storage/'.$this->image);
    }
}
