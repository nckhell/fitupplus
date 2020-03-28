<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BusinessHours extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'business_hours';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'day',
        'morning_open',
        'morning_closing',
        'afternoon_open',
        'afternoon_closing',
        'continious_open',
        'continious_closing'
    ];

    /**
     * Validation rules for the business hours
     *
     * @return array
     */
    public static $validation_rules = [
        'day' => 'required|numeric'
    ];
}
