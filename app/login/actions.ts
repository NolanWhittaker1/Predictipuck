"use server";

import { redirect } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export async function login(prevState: any , formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');
    
    if(!email || !password) {
        return {
            error: "Please input email and password."
        }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: (email as string),
        password: (password as string),
    })

    if(error) {
        return {
            error: "Invalid username or password."
        }
    }

    redirect('/');
}