<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $table = 'tbl_students';
    protected $primaryKey = 'student_id';
    public $timestamps = false;
    protected $fillable = [
        "student_id",
        "fname",
        "lname",
        "mname",
        "course_code",
        "course",
        "block_section",
        "year_level"
    ];
}
