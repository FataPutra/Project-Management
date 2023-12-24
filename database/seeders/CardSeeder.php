<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $projects = [1,1,1,2,2,2];
        $jobs = [2,3,4,4,3,2];
        $title = [
            'Design Authentication',
            'Slicing Authentication',
            'Database Diagram for Authentication',
            'Design Home, Cart, and List Product',
            'Slicing Home, Cart, and List Product',
            'Design Database Diagram for Home, Cart and List Product',
        ];
        $description = [
            'Design User Interface dan User Experience untuk page authentication(Login dan Register)',
            'Slicing Design dari fimga ke Kodingan',
            'Design Database Diagram di diagrams.net',
            'Design layout Home,Cart, and list Product',
            'Slicing to front-end from design Layout Home,Cart, and List',
            'Implementasi Database Diagram for Home, Cart adn List Product',
        ];

        for($i=0; $i<count($title); $i++){
            DB::table('cards')->insert([
                'project_id' => $projects[$i],
                'job_id' => $jobs[$i],
                'title' => Crypt::encryptString($title[$i]),
                'description' => Crypt::encryptString($description[$i]),
                'image' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]);
        }
    }
}
