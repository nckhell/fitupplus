<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class InscriptionsCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'data' => InscriptionResource::collection($this->collection),
            'meta' => [
                'total_inscription_count' => $this->collection->count()
            ],
        ];
    }
}
