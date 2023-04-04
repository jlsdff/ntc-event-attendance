<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_attendees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');
            $table->unsignedBigInteger('student_id');
            $table->foreign('event_id')
                ->references('event_id')
                ->on('tbl_events')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('student_id')
                ->references('student_id')
                ->on('tbl_students')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->string('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_attendees');
    }
}
