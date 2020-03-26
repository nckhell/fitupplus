<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Roster extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'lesson_id',
        'day',
        'start_time',
        'end_time'
    ];

    /**
     * Validation rules for the roster entries
     *
     * @return array
     */
    public static $validation_rules = [
        'lesson_id' => 'required|numeric',
        'day' => 'required|numeric',
        'start_time' => 'required',
        'end_time' => 'required'
    ];
}
