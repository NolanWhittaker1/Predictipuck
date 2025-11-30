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
        const supabase = createClient()

        const { error } = await supabase.auth.signOut()
        
        redirect('/login');
    }

    return (
        <div className="flex flex-row items-center justify-between w-full px-8 py-4 bg-ghostwhite">
            {/* Predictipuck - Aligned to the far left */}
            <a href="/" className="text-xl font-semibold text-black flex flex-row items-center">Puckpredictor</a>
            
            {/* Main Navigation Links - Grouped in the middle */}
            <div className="flex space-x-10 font-semibold">
                <a href="/predict">Predict</a>
                <a href="/leaderboard">Leaderboard</a>
                <a href="/profile">Profile</a>
            </div>
            
            {/* Login/Logout - Aligned to the far right */}
            {isLogged ? (
                <button 
                    type="button" 
                    className="font-semibold cursor-pointer"
                    onClick={() => handleLogout()}
                >
                    Logout
                </button>
            ) : (
                <a 
                    href="/login" 
                    className="font-semibold cursor-pointer"
                >
                    Login
                </a>
            )}
        </div>
    );
}