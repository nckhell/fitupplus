<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LessonResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'instructor' => new TeamResource($this->whenLoaded('instructor')),
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'images' => explode(';', $this->images),
            'max_inscriptions' => $this->max_inscriptions,
            'order' => $this->order,
        ];
    }
}
