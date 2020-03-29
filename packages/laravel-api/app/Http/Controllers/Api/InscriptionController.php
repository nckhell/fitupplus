<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Inscription;
use App\Roster;
use App\Http\Resources\InscriptionsCollection;
use App\Http\Resources\InscriptionResource;
use App\Http\Resources\RosterCollection;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

class InscriptionController extends Controller
{
    /**
     * Return inscriptions based on parameters
     */
    public function show($year = null, $month = null, $day = null)
    {
        if ($day != null && $month != null && $year != null) {
            $date = strtotime(join('-', array($year, $month, $day)));
            $nbr_day_of_the_week = date('N', $date);

            $roster = new RosterCollection(
                Roster::with(
                    [
                        'lesson',
                        'inscriptions' => function ($query) use ($date) {
                            $query->whereDate('date', date('Y-m-d', $date));
                        }
                    ]
                )
                    ->where('day', $nbr_day_of_the_week)
                    ->orderBy('start_time', 'asc')
                    ->get()
            );


            return $roster;
        }

        return new InscriptionsCollection(Inscription::with(['roster'])->get());
    }

    /**
     * New inscription via the public website
     */
    public function store_via_public_endpoint(Request $request)
    {
        /** 
         * Validation errors will be returned via JSON 
         * with status code 422
         **/
        $request->validate(Inscription::$validation_rules);

        $inscription = Inscription::create(
            array_merge(
                $request->all(),
                [
                    'public_inscription' => 1,
                    'unsubscribe_hash' => Str::random(20)
                ]
            )
        );

        return Response::json([
            "message" => "Inscription created!",
            "inscription" => new InscriptionResource($inscription)
        ], 201);
    }

    /**
     * New inscription via the admin panel
     */
    public function store_via_private_endpoint(Request $request)
    {
        /** 
         * Validation errors will be returned via JSON 
         * with status code 422
         **/
        $request->validate(Inscription::$validation_rules);

        $inscription = Inscription::create(
            array_merge(
                $request->all(),
                [
                    'public_inscription' => 0,
                    'unsubscribe_hash' => Str::random(20)
                ]
            )
        );

        return Response::json([
            "message" => "Inscription created!",
            "inscription" => new InscriptionResource($inscription)
        ], 201);
    }

    public function unsubscribe(Request $request, $hash)
    {
        $inscription = Inscription::where('unsubscribe_hash', '=', $hash)->firstOrFail();
        $inscription->delete();

        return Response::json(null, 200);
    }

    public function delete(Request $request, $id)
    {
        $inscription = Inscription::findOrFail($id);
        $inscription->forceDelete();

        return Response::json(null, 200);
    }
}
