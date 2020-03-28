<?php

namespace Tests\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\ApiTestCase;
use App\User;

class UserTest extends ApiTestCase
{
    use RefreshDatabase;

    /** @test */
    public function should_return_authenticated_user_when_logged_in()
    {
        $name = 'FitUp Plus';
        $email = 'fitup@plus.dev';

        $user = factory(User::class)->create([
            'name' => $name,
            'email' => $email
        ]);

        $response = $this->actingAs($user, 'sanctum')->json('GET', '/api/user');

        $response
            ->assertStatus(200)
            ->assertJson([
                'name' => $name,
                'email' => $email,
            ]);
    }

    /** @test */
    public function should_return_unauthenticated_status_when_not_authenticated()
    {
        $response = $this->json('GET', '/api/user');

        $response
            ->assertStatus(401)
            ->assertJson([
                'message' => 'Unauthenticated.'
            ]);
    }
}
