<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Team;
use App\Http\Resources\TeamCollection;

class TeamController extends Controller
{
    /**
     * Return all team members
     */
    public function show()
    {
        return new TeamCollection(Team::all());
    }
}
