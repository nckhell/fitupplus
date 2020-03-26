<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

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

function get_fake_paragraphs(Faker $faker_instance)
{
    $paragraphs = rand(1, 5);
    $i = 0;
    $ret = "";
    while ($i < $paragraphs) {
        $ret .= "<p>" . $faker_instance->paragraph(rand(2, 6)) . "</p>";
        $i++;
    }
    return $ret;
}

$factory->define(News::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'slug' => $faker->slug,
        'text' => get_fake_paragraphs($faker)
    ];
});
