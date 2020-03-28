<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inscriptions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'date',
        'name',
        'email',
        'unsubscribe_hash',
        'public_inscription'
    ];

    /**
     * Validation rules for the business hours
     *
     * @return array
     */
    public static $validation_rules = [
        'roster_id' => 'required|numeric',
        'date' => 'required|date',
        'name' => 'required|string',
        'email' => 'email'
    ];

    /**
     * Get roster record associated with the inscription.
     */
    public function roster()
    {
        return $this->belongsTo('App\Roster', 'roster_id', 'id');
    }
}
