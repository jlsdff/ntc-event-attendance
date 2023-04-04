<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendeeController;
use App\Http\Controllers\AuthController;

/*
|---------------------
|    Public Routes  --
|---------------------
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------
| Protected Routes --
|--------------------
*/
Route::group(['middleware'=>['auth:sanctum']], function(){
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/event/attendee/{event_id}', [EventController::class, 'getAttendees']);
    Route::get('/event', [EventController::class, 'index']);
    Route::post('/event', [EventController::class, 'store']);
    Route::put('/event/{event_id}', [EventController::class, 'update']);
    Route::delete('/event/{event_id}', [EventController::class, 'destroy']);
    Route::get('/event/{event_id}', [EventController::class, 'show']);
    Route::post('/attendee', [AttendeeController::class, 'store']);
});





/*
|--------------------------------------------------------------------------
| Testing Routes // TODO: Remove this
|--------------------------------------------------------------------------
*/
Route::get('/student', [StudentController::class, 'index']);
Route::post('/student', [StudentController::class, 'store']);
Route::get('/student/{student_id}', [StudentController::class, 'show']);
Route::delete('/student/{student_id}', [StudentController::class, 'destroy']);
Route::put('/student/{student_id}', [StudentController::class, 'update']);
Route::get('/attendee', [AttendeeController::class, 'index']);
/*
|--------------------------------------------------------------------------
| Testing Routes // TODO: Remove this
|--------------------------------------------------------------------------
*/
