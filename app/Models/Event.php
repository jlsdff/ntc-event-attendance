<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Course;
use App\Models\YearLevel;

class Event extends Model
{
    use HasFactory;

    protected $table = 'tbl_events';
    protected $primaryKey = 'event_id';
    protected $fillable = [
        'event_name',
        'event_date',
        'event_time'
    ];

    // Relationships
    public function courses(){
        return $this->hasMany(Course::class, 'event_id', 'event_id');
    }
    public function yearLevels(){
        return $this->hasMany(YearLevel::class, 'event_id', 'event_id');
    }
    public function students(){
        return $this->belongsToMany(Student::class, 'tbl_attendees', 'event_id', 'student_id');
    }
}
