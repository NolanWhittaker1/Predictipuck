"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
export async function login(prevState: any , formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    if(!email || !password) {
        return {
            error: "Please input email and password."
        }
    }

    const supabase = await createClient();

    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: (email as string),
        password: (password as string),
    })

    if(error || !data.session?.access_token) {
        return {
            error: "Invalid username or password."
        }
    }
    


    redirect('/');
}