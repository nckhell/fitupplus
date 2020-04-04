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
     * Return lessons
     */
    public function show()
    {
        return new LessonsCollection(Lesson::with(['instructor'])->get());
    }

    /**
     * Create a new lesson
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
                'slug' => Str::slug($request->get('title'), '-'),
                'images' => join(';', $images)
            ]
        ));

        return Response::json([
            "message" => "Lesson created!",
            "lesson" => new LessonResource($lesson)
        ], 201);
    }

    /**
     * Update a lesson
     */
    public function update(Request $request)
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
                'slug' => Str::slug($request->get('title'), '-'),
                'images' => join(';', $images)
            ]
        ));

        return Response::json([
            "message" => "Lesson created!",
            "lesson" => new LessonResource($lesson)
        ], 201);
    }

    /**
     * Delete a lesson
     */
    public function delete(Request $request, $id)
    {
        $lesson = Lesson::findOrFail($id);
        $lesson->delete();

        return Response::json(null, 200);
    }
}
