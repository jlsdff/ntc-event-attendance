<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AttendeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/event', [EventController::class, 'index']);
Route::post('/event', [EventController::class, 'store']);
Route::put('/event/{event_id}', [EventController::class, 'update']);
Route::delete('/event/{event_id}', [EventController::class, 'destroy']);
Route::get('/event/{event_id}', [EventController::class, 'show']);
Route::get('/event/attendee/{event_id}', [EventController::class, 'getAttendees']);


Route::get('/student', [StudentController::class, 'index']);
Route::post('/student', [StudentController::class, 'store']);
Route::get('/student/{student_id}', [StudentController::class, 'show']);
Route::delete('/student/{student_id}', [StudentController::class, 'destroy']);
Route::put('/student/{student_id}', [StudentController::class, 'update']);

Route::post('/attendee', [AttendeeController::class, 'store']);
Route::get('/attendee', [AttendeeController::class, 'index']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
