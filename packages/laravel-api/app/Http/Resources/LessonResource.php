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
        $wip_images_arr = array_filter(explode(";", $this->images));

        $images_arr = [];
        if(count($wip_images_arr) >= 1) {
            foreach ($wip_images_arr as $img_path){ 
                $images_arr[] = [
                    'img_path' => $img_path, 
                    'img_url' => env('APP_URL').'/storage/' . $img_path
                ];
            } 
        }

        return [
            'id' => $this->id,
            'instructor_id' => $this->instructor_id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'images' => $images_arr,
            'max_inscriptions' => $this->max_inscriptions,
            'order' => $this->order,
            'instructor' => new TeamResource($this->whenLoaded('instructor'))
        ];
    }
}
