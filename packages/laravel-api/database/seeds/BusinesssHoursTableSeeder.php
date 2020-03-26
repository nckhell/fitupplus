<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BusinesssHoursTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('business_hours')->insert(
            [
                'day' => 1,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => '16:30:00',
                'afternoon_closing' => '22:00:00',
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 2,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => '16:30:00',
                'afternoon_closing' => '22:00:00',
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 3,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => '16:30:00',
                'afternoon_closing' => '22:00:00',
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 4,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => '16:30:00',
                'afternoon_closing' => '22:00:00',
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 5,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => '16:30:00',
                'afternoon_closing' => '21:00:00',
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 6,
                'morning_open' => '09:00:00',
                'morning_closing' => '13:00:00',
                'afternoon_open' => NULL,
                'afternoon_closing' => NULL,
                'continious_open' => NULL,
                'continious_closing' => NULL
            ],
            [
                'day' => 7,
                'morning_open' => '09:00:00',
                'morning_closing' => '12:00:00',
                'afternoon_open' => NULL,
                'afternoon_closing' => NULL,
                'continious_open' => NULL,
                'continious_closing' => NULL
            ]
        );
    }
}
