<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
class Order extends Model
{
    use HasFactory,LogsActivity;
    protected $guarded = [];
    protected $casts = [
        'last_action_at' => 'datetime',
        'updated_at' => 'datetime',
        'created_at' => 'datetime',
    ];
    protected $appends = ['service_name','created_at_human'];
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
    public function getServiceNameAttribute()
    {
        return $this->service->name;
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
    public function getCreatedAtHumanAttribute()
    {
        return Carbon::parse($this->created_at)->format('Y-m-d h:i:s A');
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (is_null($order->order_id)) {
                $order->order_id = self::generateOrderId();
            }
        });
    }
    protected static function generateOrderId()
    {
        return 'ORD' . time();
    }
}
