<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'slug',
        'text',
        'image',
        'spotlight',
        'published'
    ];

    /**
     * Validation rules for news
     *
     * @return array
     */
    public static $validation_rules = [
        'title' => 'required',
        'slug' => 'required|unique:news|string',
        'text' => 'required',
        'image' => 'nullable|image',
        'spotlight' => 'nullable|boolean',
        'published' => 'nullable|boolean',
    ];
}
