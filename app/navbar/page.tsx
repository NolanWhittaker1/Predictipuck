"use client";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";

export default function Navbar() {
    const supabase = createClient();
    const [isLogged, setIsLogged] = useState(false);
     useEffect(() => {
            const fetchdata = async () => {
                const user = await supabase.auth.getUser();
                const user_id = user.data.user?.id;
                console.log(user_id);
                let { data: profiles, error: userError } = await supabase.from('profiles').select("*").eq('id', user_id);
                
                if(userError) {
                    return;
                }
                setIsLogged(true);

            }
    
            fetchdata();
    
        }, [])

    const handleLogout = async () => {
        // 1. Initialize the client-side Supabase instance
        const supabase = createClient()

        // 2. Call the signOut method
        const { error } = await supabase.auth.signOut()
        
        redirect('/login');
    }

    return (
        <div className="flex flex-row items-center justify-between w-full px-4 py-2">
            {/* Predictipuck - Aligned to the far left */}
            <a href="/" className="text-xl font-bold text-white"><img className="h-15 w-fit" src="/logo_transparent.png"></img></a>
            
            {/* Main Navigation Links - Grouped in the middle */}
            <div className="flex space-x-4">
                <a href="/stats" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Stats</a>
                <a href="/predict" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Predict</a>
                <a href="/leaderboard" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Leaderboard</a>
                <a href="/profile" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Profile</a>
            </div>
            
            {/* Login/Logout - Aligned to the far right */}
            {isLogged ? (
                <button 
                    type="button" // Changed h1 to button for semantic correctness
                    className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" 
                    onClick={() => handleLogout()}
                >
                    Logout
                </button>
            ) : (
                <a 
                    href="/login" 
                    className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Login
                </a>
            )}
        </div>
    );
}