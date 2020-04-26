<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lesson;
use App\Http\Resources\LessonResource;
use App\Http\Resources\LessonsCollection;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LessonsController extends Controller
{
    /**
     * Return all lessons
     *
     * @return Response
     */
    public function index()
    {
        return new LessonsCollection(Lesson::with(['instructor'])->get());
    }

    /**
     * Return specific lesson
     *
     * @param  string  $id
     * @return Response
     */
    public function show($id)
    {
        return new LessonResource(Lesson::findOrFail($id));
    }

    /**
     * Create a new lesson
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        /** 
         * Validation errors will be returned via JSON 
         * with status code 422
         **/
        $request->validate(Lesson::$validation_rules);

        $images = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = Storage::putFile(Lesson::$image_dir, $image);
                $images[] = $path;
            }
        }

        $lesson = Lesson::create(array_replace(
            $request->all(),
            [
                'slug' => Str::slug($request->input('title'), '-'),
                'images' => join(';', $images),
                'order' => Lesson::count() + 1
            ]
        ));

        return Response::json([
            "message" => "Lesson created!",
            "lesson" => new LessonResource($lesson)
        ], 201);
    }

    /**
     * Update a lesson
     *
     * @param  Request  $request
     * @param  string  $id
     * @return Response
     */
    public function update(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson_images = explode(';', $lesson->images);

        // Delete images if necessary
        $removed_images = $request->get('removed_images') ;
        Storage::delete($removed_images);
        $wip_images = array_diff($lesson_images, $removed_images);

        /** 
         * Validation errors will be returned via JSON 
         * with status code 422
         **/
        $request->validate(Lesson::$validation_rules);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = Storage::putFile(Lesson::$image_dir, $image);
                $wip_images[] = $path;
            }
        }

        $lesson->update(array_replace(
            $request->all(),
            [
                'slug' => Str::slug($request->get('title'), '-'),
                'images' => join(';', $wip_images)
            ]
        ));

        return Response::json([
            "message" => "Lesson updated!",
            "lesson" => new LessonResource($lesson)
        ], 201);
    }

    /**
     * Delete a lesson
     *
     * @param  string  $id
     * @return Response
     */
    public function delete($id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();
        Storage::delete(explode(';', $lesson->images));

        return Response::json(null, 200);
    }
}
