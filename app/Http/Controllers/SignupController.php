<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ParentDetail;
use App\Models\Kid;
use Illuminate\Support\Facades\Hash;


class SignupController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'parentName' => 'required|string',
            'email' => 'required|email|unique:user_log,email',
            'parentPassword' => 'required|min:6',
            'kidName' => 'required|string',
            'kidAge' => 'required|integer',
        ]);

        // Create Parent user
        $parentUser = User::create([
            'name' => $request->parentName,
            'email' => $request->email,
            'password' => Hash::make($request->parentPassword),
            'role' => 'parent'
        ]);
        $parentUser->assignRole('parent');

        // Insert into parents table
        $parent = ParentDetail::create([
            'user_id' => $parentUser->id,
            'full_name' => $request->parentName
        ]);

        // Create Kid user
        $kidUser = User::create([
            'name' => $request->kidName,
            'email' => strtolower($request->kidName).'@kids.local', // Kids may not have real emails
            'password' => Hash::make($request->kidPassword),
            'role' => 'kid'
        ]);
        $kidUser->assignRole('kid');

        // Insert into kids table
        Kid::create([
            'user_id' => $kidUser->id,
            'parent_id' => $parent->id,
            'full_name' => $request->kidName,
            'nickname' => $request->kidNickname,
            'age' => $request->kidAge,
            'birth_month' => $request->kidBirthMonth
        ]);

        return response()->json(['message' => 'Accounts created successfully'], 201);
    }
}
