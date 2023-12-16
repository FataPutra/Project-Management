<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CardController extends Controller
{
    public function createCard(Request $request)
    {
        try{
            $request->validate([
                'title' => 'required|max:255',
                'description' => 'required',
                'job' => 'required',
                'image' => 'nullable|image',
            ]);

            if($request->hasFile('image')){

                // Formulir membawa file gambar
                $image = $request->file('image');

                // Generate nama unik berdasarkan waktu saat ini
                $imageName = now()->format('YmdHis') . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();

                // Simpan file ke direktori public
                $imagePath = $image->storeAs('cards', $imageName, 'public');

            }else{
                $imagePath = null;
            }

            $card = Card::create([
                'project_id' => $request->project_id,
                'job_id' => $request->job,
                'title' => $request->title,
                'description' => $request->description,
                'image' => $imagePath,

            ]);

            // return response()->json([
            //     $request->all(),
            // ]);
        }catch(Exception $e){
            return $e->getMessage();
        }
    }

}
