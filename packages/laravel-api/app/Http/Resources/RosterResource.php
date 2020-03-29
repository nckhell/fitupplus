<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RosterResource extends JsonResource
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
            'day' => $this->day,
            'start_time' => date('G:i', strtotime($this->start_time)),
            'end_time' => date('G:i', strtotime($this->end_time)),
            'lesson' => new LessonResource($this->whenLoaded('lesson')),
            'inscriptions' => new InscriptionsCollection($this->whenLoaded('inscriptions'))
        ];
    }
}
