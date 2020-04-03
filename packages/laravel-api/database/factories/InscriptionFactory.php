<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Inscription;
use App\News;
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

$factory->define(Inscription::class, function (Faker $faker) {
    $date = $faker->dateTimeBetween($startDate = '-2 years', $endDate = 'now');

    return [
        'roster_id' => rand(1, 15),
        'date' => $date->format("Y-m-d"),
        'name' => $faker->name,
        'email' => $faker->email,
        'unsubscribe_hash' => Str::random(10)
    ];
});
