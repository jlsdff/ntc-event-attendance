<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class YearLevel extends Model
{
    use HasFactory;

    protected $table = 'tbl_year_levels';
    
    protected $fillable = ([
        'year_level',
        'event_id'
    ]);
}
