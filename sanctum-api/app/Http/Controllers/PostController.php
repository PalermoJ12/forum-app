<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Exception;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $posts = Post::with('comments', 'comments.user', 'user')->get();

            return response([
                "posts" => $posts
            ], 200);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            Post::create([
                'title' => $request->postTitle,
                'body' => $request->postBody,
                'user_id' => $request->user()->id
            ]);


        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage(),
                "user" => $request->user()->id
            ], 500);
        }
    }

    public function show(Request $request)
    {
        try {

            $myPosts = Post::where('user_id', $request->user()->id)->get();

            $myPosts->load('user', 'comments', 'comments.user');
            return response([
                "status" => "Success",
                "response" => $myPosts
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {

            $post = Post::findOrFail($id);
            $update = $post->update([
                'title' => $request->postTitle,
                'body' => $request->postBody
            ]);

            return response([
                "status" => "Success",
                "response" => $update
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function destroy($id)
    {
        try {
            Post::destroy($id);
            return response([
                "status" => "Success",
                "response" => "Post Deleted"
            ]);

        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
