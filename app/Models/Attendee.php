<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendee extends Model
{
    use HasFactory;
    protected $table = "tbl_attendees";
    protected $fillable = [
        "event_id",
        "student_id",
        "status"
    ];  
}
