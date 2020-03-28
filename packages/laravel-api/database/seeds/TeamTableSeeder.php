<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TeamTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('team')->insert(
            [
                [
                    'first_name' => 'Ayar',
                    'last_name' => 'Castro',
                    'slug' => 'ayar-castro',
                    'function' => 'Operationele verantwoordelijke',
                    'order' => 1
                ],
                [
                    'first_name' => 'Philippe',
                    'last_name' => 'Van der Donckt',
                    'slug' => 'philippe-van-der-donckt',
                    'function' => 'Zakelijke verantwoordelijke',
                    'order' => 2
                ],
                [
                    'first_name' => 'Julie',
                    'last_name' => 'de Halleux',
                    'slug' => 'julie-de-halleux',
                    'function' => 'Yoga',
                    'order' => 3
                ],
                [
                    'first_name' => 'Reno',
                    'last_name' => 'De Pauw',
                    'slug' => 'reno-de-pauw',
                    'function' => 'Fitness medewerker',
                    'order' => 4
                ],
                [
                    'first_name' => 'Guy',
                    'last_name' => 'Van Roosenbroeck',
                    'slug' => 'guy-van-roosenbroeck',
                    'function' => 'Lesgever',
                    'order' => 5
                ],
                [
                    'first_name' => 'Charro',
                    'last_name' => 'Pyl',
                    'slug' => 'charro-pyl',
                    'function' => 'Lesgever',
                    'order' => 6
                ]
            ]
        );
    }
}
