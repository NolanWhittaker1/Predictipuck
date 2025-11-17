"use client";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function Navbar() {

    const handleLogout = async () => {
    // 1. Initialize the client-side Supabase instance
    const supabase = createClient()

    // 2. Call the signOut method
    const { error } = await supabase.auth.signOut()
    
    redirect('/login');
  }

    return (
        <div className="flex flex-row top-0 space-x-4">
            <a href="/">Home</a>
            <a href="/predict">Predict</a>
            <a href="/profile">Profile</a>
            <a href="/login">Login</a>
            <h1 onClick={() => handleLogout()}>Logout</h1>
        </div>
    );
}