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

class Client extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, LogsActivity;
    protected $guarded = [];
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
}
