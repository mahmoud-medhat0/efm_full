<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Laravel\Sanctum\HasApiTokens;
class Client extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, LogsActivity,HasApiTokens;
    protected $guarded = [];
    protected $appends = ['has_active_subscription','referral_count','activator_count','membership','profile_image_url'];
    protected $casts = [
        'email_verified_at' => 'datetime',
        'kyc_verified_at' => 'datetime',
        'telegram_verified_at' => 'datetime',
    ];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->hasMany(Activity::class, 'causer_id', 'id');
    }
    public function ValidClient()
    {
        return $this->where('email_verified', 1)
        ->where('is_active', 1)
        ->where('telegram_verified', 1)
        ->where('kyc_verified', 1);
    }
    public function orders()
    {
        return $this->hasMany(Order::class,'provider_id','id');
    }
    public function interests()
    {
        return $this->belongsToMany(InterestCategory::class);
    }
    public function loginAttempts()
    {
        return $this->morphMany(LoginAttempt::class, 'authenticatable');
    }
    public function withdrawAccounts()
    {
        return $this->hasMany(WithdrawAccount::class);
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
    public function deposits()
    {
        return $this->transactions()->where('type', 'deposit')->get();
    }
    public function withdrawals()
    {
        return $this->transactions()->where('type', 'withdrawal')->get();
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function notRemovedTasks()
    {
        return $this->tasks()->where('removed', false);
    }
    public function banAttemps()
    {
        return $this->hasMany(BanAttemp::class);
    }
    public function subscriptionMemberships()
    {
        return $this->hasMany(SubscriptionMembership::class);
    }
    public function getMembershipAttribute()
    {
        return $this->subscriptionMemberships()->where('status', 'active')->first()? $this->subscriptionMemberships()->where('status', 'active')->first()->membership : null;
    }
    public function getHasActiveSubscriptionAttribute()
    {
        return $this->subscriptionMemberships()->where('status', 'active')->exists();
    }
    public function getReferralCountAttribute()
    {
        return $this->where('ref_id', $this->id)->count();
    }
    public function getActivatorCountAttribute()
    {
        return $this->where('ref_id', $this->id)->whereNotNull('activator_count')->count();
    }
    public function parent()
    {
        return $this->hasOne(Client::class, 'id', 'ref_id');
    }
    public function referrals()
    {
        return $this->hasMany(Client::class, 'ref_id', 'id');
    }
    public function hasVerifiedEmail()
    {
        return $this->email_verified == 1;
    }
    public function getProfileImageUrlAttribute()
    {
        return asset('storage/'.$this->profile_image);
    }
    public function tickets()
    {
        return $this->hasMany(Ticket::class);
    }
}
