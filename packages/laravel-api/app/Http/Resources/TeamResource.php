<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TeamResource extends JsonResource
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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'slug' => $this->slug,
            'function' => $this->function,
            'email' => $this->email,
            'description' => $this->description,
            'profile_image' => $this->profile_image,
            'order' => $this->order,
            'lessons' => new LessonsCollection($this->lessons),
        ];
    }
}
