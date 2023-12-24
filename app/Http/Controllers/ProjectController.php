<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Project;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function myProject(){

        $projects = Auth::user()->projects()->get();

        return response()->json([
            'projects' => $projects,
        ]);
    }

    public function detailProject(string $id)
    {
        // return Project::findOrFail($id);
        $project = Project::findOrFail($id);

        $cards = $project->cards()->with('job')->get();

        $cards->each(function ($card) {
            $card->title = Crypt::decryptString($card->title);
        });

        return Inertia::render('Project/Project', [
            'project' => $project,
            'card' => $cards,
            'member' => $project->users()->get(),
            'jobs' => Job::all()->except([1]),
        ]);
    }

    public function createProject(Request $request)
    {
        $user = Auth::user();
        $job = Job::where('name_job', 'admin')->first();

        $request->validate([
            'name' => 'required'
        ]);

        $project = Project::create([
            'name_project' => $request->name
        ]);

        $project->users()->attach($user->id,[
            'job_id' => $job->job_id,
        ]);

        return response()->json([
            'message' => 'Project berhasil ditambahkan',
            'project_id' => $project->project_id,
        ]);
    }

    public function deleteProject(string $id)
    {
        try {
            $project = Project::findOrFail($id);
            $project->users()->detach();
            $project->delete();

            // $project->jobsInUsers()->detach();

            return response()->json([
                'message' => 'project berhasil dihapus'
            ]);
        } catch (\Throwable $th) {
            throw $th;
        }

    }

    public function addMember(Request $request)
    {
        try {
            $request->validate([
                'project_id' => 'required',
                'email' => 'required|email',
                'job' => 'required',
            ]);

            $user = User::where('email', $request->email)->firstOrFail();

            Project::findOrFail($request->project_id)->users()->attach($user->id,[
                'job_id' => $request->job,
            ]);

            return response()->json('berhasil menambahkan email : '. $request->email);

        } catch (Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    public function deleteMember(Request $request)
    {
        $project = Project::findOrFail($request->project);
        $project = $project->users()->detach($request->member['id']);

        return response()->json('berhasil menghapus '. $request->member['name']);

    }
}
