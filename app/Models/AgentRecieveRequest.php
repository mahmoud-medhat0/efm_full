<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AgentRecieveRequest extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function gateway()
    {
        return $this->belongsTo(Gateways::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }
    public function scopePending($query)
    {
        return $query->where('status', 'pending')->where('transaction_id', null);
    }
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->user_id = auth('admin')->user()->id;
        });
    }
}
