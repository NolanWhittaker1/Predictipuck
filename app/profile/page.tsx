"use client";
import { createClient } from "../utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function Profile() {
  const supabase = createClient();
 
  return (
    <div className="w-screen min-h-screen h-fit flex justify-center items-center">
      
    </div>
  );
}
