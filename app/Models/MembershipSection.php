<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;

class MembershipSection extends Model
{
    use HasFactory,HasTranslations;
    protected $translatable = ['title', 'description'];
}
