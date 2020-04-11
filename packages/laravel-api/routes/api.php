<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::prefix('/inscriptions')->group(function () {
    Route::post('/create-public', 'InscriptionController@store_via_public_endpoint');
    Route::post('/unsubscribe/{hash}', 'InscriptionController@unsubscribe');
});

Route::prefix('/lessons')->group(function () {
    Route::get('', 'InscriptionController@store_via_private_endpoint');
});

Route::prefix('/team')->group(function () {
    Route::get('', 'TeamController@show');
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::prefix('/inscriptions')->group(function () {
        Route::prefix('/statistics')->group(function () {
            Route::get('/totals', 'StatisticsController@inscription_totals');
            Route::get('/monthly', 'StatisticsController@monthly_inscriptions');
            Route::get('/inscriptions_by_roster', 'StatisticsController@inscriptions_by_roster');
            Route::get('/inscriptions_by_lessons/{month?}', 'StatisticsController@inscriptions_by_lessons');
        });
        Route::get('/{year?}/{month?}/{day?}', 'InscriptionController@show');
        Route::post('', 'InscriptionController@store_via_private_endpoint');
        Route::delete('/{id}', 'InscriptionController@delete');
    });

    Route::prefix('/lessons')->group(function () {
        Route::get('', 'LessonsController@index');
        Route::post('', 'LessonsController@store');
        Route::get('/{id}', 'LessonsController@show');
        Route::put('/{id}', 'LessonsController@update');
        Route::delete('/{id}', 'LessonsController@delete');
    });

    Route::prefix('/roster')->group(function () {
        Route::get('', 'RosterController@show');
        Route::post('', 'RosterController@store');
        Route::put('/{id}', 'RosterController@update');
        Route::delete('/{id}', 'RosterController@delete');
    });

    Route::prefix('/team')->group(function () {
    });
});
