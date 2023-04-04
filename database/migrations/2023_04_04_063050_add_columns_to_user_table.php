<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColumnsToUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->renameColumn('id', 'user_id');
            //next to id, add fname, lname, department
            $table->string('fname')->after('id');
            $table->string('lname')->after('fname');
            $table->string('department')->after('lname');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->renameColumn('user_id', 'id');
            $table->dropColumn('fname');
            $table->dropColumn('lname');
            $table->dropColumn('department');
        });
    }
}
