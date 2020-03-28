<?php

namespace Tests\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\ApiTestCase;
use App\Http\Resources\InscriptionResource;
use App\Http\Resources\RosterResource;
use App\Http\Resources\InscriptionsCollection;
use App\Inscription;
use App\User;
use App\Roster;

class InscriptionTest extends ApiTestCase
{
    use RefreshDatabase;

    /** @test */
    public function inscription_has_a_roster_relationship()
    {
        $resource = (new InscriptionResource(
            factory(Inscription::class)->create([
                "roster_id" => factory(Roster::class)->create(
                    ['id' => 1]
                )
            ])
        ))->jsonSerialize();

        $this->assertInstanceOf(RosterResource::class, $resource["roster"]);
    }

    /** @test */
    public function inscription_collection_should_return_the_correct_data_in_response()
    {
        $inscriptions = factory(Inscription::class, 20)->create();
        $user = factory(User::class)->create();

        $response = $this->actingAs($user, 'sanctum')->json('GET', '/api/inscriptions');

        $resourceCollection = new InscriptionsCollection($inscriptions);
        $resourceResponse = $resourceCollection->response()->getData(true);

        $this->assertEquals($response->json(), $resourceResponse);
    }
}
