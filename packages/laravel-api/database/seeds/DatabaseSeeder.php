<?php

use App\BusinessHours;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(BusinesssHoursTableSeeder::class);
        $this->call(TeamTableSeeder::class);
        $this->call(LessonTableSeeder::class);
        $this->call(RosterTableSeeder::class);
        $this->call(NewsTableSeeder::class);
    }
}
