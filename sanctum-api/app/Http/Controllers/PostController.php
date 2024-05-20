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

    public function update(Request $request, Post $post)
    {
        try {
            $post->update([
                'title' => $request->title,
                'body' => $request->body
            ]);
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }


    public function destroy(Post $post)
    {
        try {
            $post->delete();
        } catch (Exception $e) {
            return response([
                "error" => $e->getMessage()
            ], 500);
        }
    }
}
