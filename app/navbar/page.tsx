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
        <div className="flex flex-row top-0">
            <button onClick={handleLogout} className="bg-blue-300 p-2">Logout</button>
        </div>
    );
}