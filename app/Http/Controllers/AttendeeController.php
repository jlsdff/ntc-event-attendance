<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Attendee;
use App\Models\Student;

class AttendeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Attendee::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        $request->validate([
            'event_id'=>'required',
            'student_id'=>'required',
            'status'=>'required',
        ]);
        if($request->student_id == null){
            $response = [
                'message' => 'Invalid QR Code'
            ];
            return response($response, 400);
        }
        if(Attendee::where('student_id', $request->student_id)->where('event_id', $request->event_id)->exists()){
            $response = [
                'message' => 'Attendee already recorded',
                'student'=> Student::where('student_id', $request->student_id)->first()
            ];
            return response($response, 400);
        }
        if(!Student::where('student_id', $request->student_id)->exists()){
            $response = [
                'message' => 'Student not found'
            ];
            return response($response, 400);
        }
        $attendee = Attendee::create($request->all());
        $response = [
            'message' => 'Attendee recorded',
            'student'=> Student::where('student_id', $request->student_id)->first()
        ];
        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Attendee::destroy($id);
        $response = [
            'message' => "Attendee deleted"
        ];
        return response($response, 200);
    }
}
