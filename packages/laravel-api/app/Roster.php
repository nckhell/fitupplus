<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Roster extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'roster';

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

    /**
     * Get lesssion associated with the roster entry
     */
    public function lesson()
    {
        return $this->belongsTo('App\Lesson', 'lesson_id', 'id');
    }

    /**
     * Get all inscription records associated with a roster entry.
     */
    public function inscriptions()
    {
        return $this->hasMany('App\Inscription', 'roster_id', 'id');
    }
}
