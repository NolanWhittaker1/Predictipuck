"use server";

import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/client";
export async function signup(prevState: any , formData: FormData) {
    const form_username = formData.get('username');
    const form_email = formData.get('email');
    const form_password = formData.get('password');
    const form_favteam = formData.get('favteam');
    
    if(!form_email || !form_username || !form_password || !form_favteam) {
        return {
            error: "Please input all the required fields"
        }
    }
    
    const supabase = createClient();
    
    const {data, error} = await supabase.auth.signUp({
        email: (form_email as string),
        password: (form_password as string),
        options: {
            data: {
                favteam: (form_favteam as string),
                username: (form_username as string)
            }
        } 
    })
    

    if(error) {
        return {
            error: "error has occured."
        }
    }
    

    redirect('/');
}