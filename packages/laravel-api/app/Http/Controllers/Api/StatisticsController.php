<?php

namespace App\Http\Controllers;

use App\Inscription;
use Illuminate\Support\Facades\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class StatisticsController extends Controller
{
    /**
     * Return total inscriptions
     */
    public function inscription_totals()
    {
        $inscriptions = Inscription::all();

        $total = $inscriptions->count();

        $current_month_total = $inscriptions->filter(function ($inscription) {
            return date('n', strtotime($inscription->date)) == date('n');
        })->count();

        $today_total = $inscriptions->filter(function ($inscription) {
            return date('Y-m-d', strtotime($inscription->date)) == date('Y-m-d');
        })->count();

        return Response::json([
            'total' => $total,
            'month_total' => $current_month_total,
            'today_total' => $today_total
        ], 200);
    }

    /**
     * Return total inscriptions grouped by month
     */
    public function monthly_inscriptions()
    {
        $data = DB::table('inscriptions')
            ->select(
                DB::raw('COUNT(*) as count'),
                DB::raw('YEAR(date) year'),
                DB::raw('MONTH(date) month'),
                DB::raw("DATE_FORMAT(date,'%b %Y') label")
            )
            ->groupBy('year', 'month')
            ->get();

        return Response::json($data, 200);
    }

    /**
     * Return total inscriptions
     */
    public function inscriptions_by_roster()
    {

        $data = DB::table('inscriptions')
            ->join('roster', 'inscriptions.roster_id', '=', 'roster.id')
            ->join('lessons', 'roster.lesson_id', '=', 'lessons.id')
            ->select(
                DB::raw('COUNT(*) as count'),
                DB::raw('YEAR(inscriptions.date) year'),
                DB::raw('MONTH(inscriptions.date) month'),
                DB::raw("DATE_FORMAT(inscriptions.date,'%b %Y') period"),
                DB::raw('roster.day day_of_the_week'),
                DB::raw(
                    "CONCAT(
                    lessons.title,
                    ' ',
                    TIME_FORMAT(roster.start_time, '%H:%i'),
                    '-', 
                    TIME_FORMAT(roster.end_time, '%H:%i'))
                     label"
                ),
            )
            ->groupBy('year', 'month', 'inscriptions.roster_id')
            ->get();

        return Response::json($data, 200);
    }

    /**
     * Return total inscriptions
     */
    public function inscriptions_by_lessons($month = null)
    {

        $query = DB::table('inscriptions')
            ->join('roster', 'inscriptions.roster_id', '=', 'roster.id')
            ->join('lessons', 'roster.lesson_id', '=', 'lessons.id')
            ->select(
                DB::raw('COUNT(*) as count'),
                DB::raw('YEAR(inscriptions.date) year'),
                DB::raw('MONTH(inscriptions.date) month'),
                DB::raw("DATE_FORMAT(inscriptions.date,'%b %Y') label"),
                DB::raw('lessons.title lesson')
            );

        if ($month && $month > 0 && $month <= 12) {
            $query->whereMonth('inscriptions.date', '=', $month);
        }
        $query->groupBy('year', 'month', 'lessons.id');

        return Response::json($query->get(), 200);
    }
}
