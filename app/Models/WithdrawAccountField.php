<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
class WithdrawAccountField extends Model
{
    use HasFactory,HasTranslations;
    protected $fillable = ['name','type','value'];
    public $translatable = ['name'];
    public function getNameEnAttribute()
    {
        return $this->getTranslation('name', 'en');
    }
}
