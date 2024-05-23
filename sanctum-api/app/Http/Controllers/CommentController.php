<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Exception;


class CommentController extends Controller
{
    public function store(Request $request)
    {


        try {

            $response = Comment::create([
                'post_id' => $request->post_id,
                'comment_body' => $request->comment_body,
                'user_id' => $request->user()->id
            ]);

            // Eager load the user relationship
            $response->load('user');

            return response([
                "status" => "Success",
                "response" => $response
            ]);


        } catch (Exception $e) {
            return response(['message' => $e->getMessage()], 500);

        }


    }

    public function update(Request $request, $id)
    {

        $comment = Comment::findOrFail($id);
        $update = $comment->update([
            'comment_body' => $request->comment_body
        ]);

        return response([
            "status" => "Success",
            "response" => $update
        ]);
    }

    public function destroy($id)
    {

        Comment::destroy($id);
        return response(['status' => 'success']);
    }
}
