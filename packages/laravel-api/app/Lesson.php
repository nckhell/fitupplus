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
     * The associated directory for the images
     *
     * @var string
     */
    public static $image_dir = 'lessons';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'instructor_id',
        'title',
        'description',
        'images',
        'max_inscriptions',
        'order'
    ];

    /**
     * Validation rules for the lessons
     *
     * @return array
     */
    public static $validation_rules = [
        'instructor_id' => 'required|numeric',
        'title' => 'required|string',
        'description' => 'nullable|string',
        'max_inscriptions' => 'nullable|numeric',
        'images' => 'nullable|array',
        'images.*' => 'nullable|mimes:jpeg,png,svg,jpg|max:2048'
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
