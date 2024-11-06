<?php

namespace App\Models;

use Carbon\Carbon;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ticket extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $with = ['ticketCategory'];
    protected $appends = ['created_human_at'];
    public function ticketCategory(){
        return $this->belongsTo(TicketCategory::class);
    }
    public function ticketMessages(){
        return $this->hasMany(TicketMessage::class);
    }
    public function client(){
        return $this->belongsTo(Client::class);
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
    public function getCreatedHumanAtAttribute(){
        return Carbon::parse($this->created_at)->format('d-m-Y h:i:s A');
    }
}
