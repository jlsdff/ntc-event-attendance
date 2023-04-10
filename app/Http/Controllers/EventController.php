<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use App\Models\Course;
use App\Models\YearLevel;
use App\Models\Attendee;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        //return all events sorted by created_at
        $events = Event::orderBy('created_at', 'desc')->get();
        foreach($events as $event){
            $event->courses;
            $event->yearLevels;
        }
        return $events;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $event = Event::create($request->all());
        foreach($request->courses as $course){
            $course = Course::create([
                'course_name' => $course,
                'event_id' => $event->event_id
            ]);
        }
        foreach($request->year_levels as $year_level){
            YearLevel::create([
                'year_level' => $year_level,
                'event_id' => $event->event_id
            ]);
        }
        $event->courses;
        $event->yearLevels;
        $response = ([
            'event' => $event
        ]);
        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($event_id)
    {
        $event = Event::find($event_id);
        $event->courses;
        $event->yearLevels;
        return $event;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $event_id)
    {
        $event = Event::find($event_id);
        Course::where('event_id', $event_id)->delete();
        YearLevel::where('event_id', $event_id)->delete();
        $event->update($request->all());
        foreach($request->courses as $course){
            $course = Course::create([
                'course_name' => $course,
                'event_id' => $event->event_id
            ]);
        }
        foreach($request->year_levels as $year_level){
            YearLevel::create([
                'year_level' => $year_level,
                'event_id' => $event->event_id
            ]);
        }
        $event->courses;
        $event->yearLevels;
        return $event;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($event_id)
    {
        return Event::destroy($event_id);
    }
    public function getAttendees($event_id){
        $event = Event::find($event_id);
        $attendees = Attendee::where('event_id', $event_id)->get();
        foreach($attendees as $attendee){
            $attendee->student;
        }
        $response = [
            'event' => $event,
            'attendees' => $attendees
        ];
        return response($response, 200);
    }
}
