<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;


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
            'id' => $this->id,
            'instructor_id' => $this->instructor_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'images' => $this->images,
            'max_inscriptions' => $this->max_inscriptions,
            'order' => $this->order,
            'instructor' => new TeamResource($this->whenLoaded('instructor'))
        ];
    }
}
