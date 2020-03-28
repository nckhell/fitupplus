<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RosterTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roster')->insert(
            [
                [
                    'lesson_id' => 1,
                    'day' => 1,
                    'start_time' => '10:15:00',
                    'end_time' => '11:15:00'
                ],
                [
                    'lesson_id' => 2,
                    'day' => 1,
                    'start_time' => '18:00:00',
                    'end_time' => '19:00:00'
                ],
                [
                    'lesson_id' => 3,
                    'day' => 1,
                    'start_time' => '19:00:00',
                    'end_time' => '20:00:00'
                ],
                [
                    'lesson_id' => 4,
                    'day' => 1,
                    'start_time' => '20:00:00',
                    'end_time' => '21:00:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 2,
                    'start_time' => '19:00:00',
                    'end_time' => '20:00:00'
                ],
                [
                    'lesson_id' => 2,
                    'day' => 2,
                    'start_time' => '20:00:00',
                    'end_time' => '21:00:00'
                ],
                [
                    'lesson_id' => 4,
                    'day' => 2,
                    'start_time' => '21:00:00',
                    'end_time' => '22:00:00'
                ],
                [
                    'lesson_id' => 5,
                    'day' => 3,
                    'start_time' => '18:00:00',
                    'end_time' => '19:00:00'
                ],
                [
                    'lesson_id' => 6,
                    'day' => 3,
                    'start_time' => '19:00:00',
                    'end_time' => '20:00:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 3,
                    'start_time' => '20:00:00',
                    'end_time' => '21:00:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 4,
                    'start_time' => '19:00:00',
                    'end_time' => '20:00:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 5,
                    'start_time' => '09:00:00',
                    'end_time' => '10:00:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 5,
                    'start_time' => '18:30:00',
                    'end_time' => '19:30:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 6,
                    'start_time' => '10:30:00',
                    'end_time' => '11:30:00'
                ],
                [
                    'lesson_id' => 1,
                    'day' => 6,
                    'start_time' => '11:30:00',
                    'end_time' => '12:30:00'
                ]
            ]
        );
    }
}
