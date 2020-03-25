<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->create_admin_user();
        $this->create_test_user();
        $this->create_random_users();
    }

    /**
     * Create an admin user based on .ENV variables
     *
     * @return void
     */
    public function create_admin_user()
    {
        DB::table('users')->insert([
            'name' => env('ADMIN_NAME', 'Admin User'),
            'email' => env('ADMIN_EMAIL', 'hello@world.com'),
            'password' => bcrypt(env('ADMIN_PASSWORD', 'admin')),
        ]);
    }

    /**
     * Create a test user
     *
     * @return void
     */
    public function create_test_user()
    {
        DB::table('users')->insert([
            'name' => 'Cypress Test',
            'email' => 'test@cypress.dev',
            'password' => bcrypt('test'),
        ]);
    }

    /**
     * Create a seed of random users
     *
     * @return void
     */
    public function create_random_users()
    {
        factory(App\User::class, 50)->create();
    }
}
