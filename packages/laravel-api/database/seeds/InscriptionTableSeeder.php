<?php

use Illuminate\Database\Seeder;

class InscriptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Inscription::class, 2000)->create();
    }
}
