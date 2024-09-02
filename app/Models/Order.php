<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class Order extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $casts = [
        'last_action_at' => 'datetime',
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
    public function provider(): BelongsTo
    {
        return $this->belongsTo(Client::class, 'provider_id', 'id');
    }
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function RejectionCause(): BelongsTo
    {
        return $this->belongsTo(RejectionCause::class);
    }
    public function LastActionBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'last_action_by', 'id');
    }
    public function ApprovedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by', 'id');
    }
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function categories()
    {
        return $this->belongsToMany(InterestCategory::class, 'order_categories');
    }
}
