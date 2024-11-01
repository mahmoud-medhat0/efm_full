<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Models\Activity;

class Gateways extends Model 
{
    use HasFactory,HasTranslations, LogsActivity;
    protected $guarded = [];
    public $translatable = ['name','description_deposit','description_withdraw'];
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()->logOnlyDirty();
    }
    public function activityLogs()
    {
        return $this->morphMany(Activity::class,'subject');
    }
    public static function depositGateways()
    {
        return self::where('deposit',1)->where('is_active',1)->get();
    }
    public static function withdrawGateways()
    {
        return self::where('withdraw',1)->where('is_active',1)->get();
    }
    public function withdrawAccounts()
    {
        return $this->hasMany(WithdrawAccount::class,'gateway_id','id');
    }
    public function transactions()
    {
        return $this->hasMany(Transaction::class,'gateway_id','id');
    }
    public function clientFields()
    {
        if($this->client_fields){
            return ManualField::whereIn('id',json_decode($this->client_fields))->get();
        }
        return null;
    }
}

