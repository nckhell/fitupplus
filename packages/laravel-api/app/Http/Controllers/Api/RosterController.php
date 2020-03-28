<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Roster;
use App\Http\Resources\RosterCollection;

class RosterController extends Controller
{
    /**
     * Return inscriptions based on parameters
     */
    public function show($day = null)
    {
        if ($day != null) {
            return new RosterCollection(Roster::where('day', $day)->get());
        }

        return new RosterCollection(Roster::all());
    }
}
