<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'lessons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'instructor_id',
        'title',
        'slug',
        'description',
        'image',
        'max_inscriptions',
        'order'
    ];

    /**
     * Get the instructor/team member associated with the lesson.
     */
    public function instructor()
    {
        return $this->belongsTo('App\Team', 'instructor_id', 'id');
    }

    /**
     * Get all roster entries associated with the lesson.
     */
    public function roster()
    {
        return $this->hasMany('App\Roster', 'lesson_id', 'id');
    }
}
