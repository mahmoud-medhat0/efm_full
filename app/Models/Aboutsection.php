<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\NovaTranslatable\Translatable;
use Spatie\Translatable\HasTranslations;

class Aboutsection extends Model
{
    use HasFactory;
    use HasTranslations;
    protected $translatable = ['title', 'description'];
}
