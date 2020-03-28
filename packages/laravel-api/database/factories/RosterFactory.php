<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Roster;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Roster::class, function (Faker $faker) {
    return [
        'lesson_id' => rand(1, 8),
        'day' => rand(1, 7),
        'start_time' => $faker->time($format = 'H:i:s', $max = 'now'),
        'end_time' => $faker->time($format = 'H:i:s', $max = 'now')
    ];
});
