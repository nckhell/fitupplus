<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date',
        'name',
        'email',
        'unsubscribe_hash'
    ];

    /**
     * Validation rules for the business hours
     *
     * @return array
     */
    public static $validation_rules = [
        'date' => 'required|date',
        'name' => 'required|string',
        'email' => 'required|email'
    ];
}
