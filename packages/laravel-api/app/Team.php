<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'team';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'slug',
        'function',
        'email',
        'description',
        'profile_image',
        'order',
    ];

    /**
     * Validation rules for the team members
     *
     * @return array
     */
    public static $validation_rules = [
        'first_name' => 'required|string',
        'last_name' => 'required|string',
        'slug' => 'required|unique:team|string',
        'function' => 'nullable|string',
        'email' => 'nullable|email',
        'description' => 'nullable|string',
        'order' => 'numeric'
    ];

    /**
     * Get all lesson records associated with a team member.
     */
    public function lessons()
    {
        return $this->hasMany('App\Lesson', 'instructor_id', 'id');
    }
}