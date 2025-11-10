"use client";

import { useActionState, useState } from "react";
import { login } from "./actions";
import { Input } from "@/components/ui/input"

export default function Login() {

    const [state, loginAction] = useActionState(login, undefined);
    const [favteam, setFavTeam] = useState('ANA');

    return (
        <div>
            <h1>Hello world</h1>
            <form action={loginAction}>
                <Input type="text" placeholder="Email" name="email"></Input>
                <Input type="password" placeholder="Password" name="password"></Input>
                <h1>{state?.error}</h1>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}