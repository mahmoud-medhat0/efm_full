<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity; 
use Carbon\Carbon;
class Transaction extends Model
{
    use HasFactory, LogsActivity;
    protected $guarded = [];
    protected $casts = [
        'created_at' => 'datetime',
    ];
    protected $appends = ['created_at_human','rejectionCause'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function rejectionCause()
    {
        return $this->belongsTo(TransactionRejectionCause::class, 'rejection_cause_id');
    }
    public function getRejectionCauseAttribute()
    {
        return $this->rejectionCause();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }
    public function gateway()
    {
        return $this->belongsTo(Gateways::class, 'gateway_id');
    }
    public function deposits()
    {
        return $this->where('type', 'deposit')->get();
    }
    public function withdrawals()
    {
        return $this->where('type', 'withdrawal')->get();
    }
    public function agentRequest()
    {
        return $this->hasOne(AgentRequest::class);
    }
    public function withdrawAccount()
    {
        return $this->hasOne(WithdrawAccount::class, 'id', 'withdraw_account_id');
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($transaction) {
            if (empty($transaction->tnx)) {
                $transaction->tnx = self::generateTransactionNumber();
            }
        });
    }

    protected static function generateTransactionNumber()
    {
        return 'TNX-' . strtoupper(uniqid());
    }
    public function getCreatedAtHumanAttribute()
    {
        return Carbon::parse($this->created_at)->format('d-m-Y h:i:s A');
    }
}
