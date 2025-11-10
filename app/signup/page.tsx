"use client";

import { useActionState, useState } from "react";
import { signup } from "./actions";
import { Input } from "@/components/ui/input"

export default function Signup() {
    const nhlTeams = ["ANA","BOS","BUF","CAR","CBJ","CGY","CHI","COL","DAL","DET","EDM","FLA","LAK","MIN","MTL","NJD","NSH","NYI","NYR","OTT","PHI","PIT","SEA","SJS","STL","TBL","TOR","UTA","VAN","VGK","WPG","WSH"];
    const [state, loginAction] = useActionState(signup, undefined);
    const [favteam, setFavTeam] = useState('ANA');

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <form action={loginAction} className="w-1/2 flex flex-col space-y-2">
                <h1 className="font font-bold text-2xl text-center select-none">Start making predictions today!</h1>
                <Input type="text" placeholder="Username" name="username"></Input>
                <Input type="text" placeholder="Email" name="email"></Input>
                <Input type="password" placeholder="Password" name="password"></Input>
                <Input type="hidden" name="favteam" defaultValue={favteam}></Input>
                <div className="flex flex-row flex-wrap">
                    {nhlTeams.map((team) => (
                        <img 
                        key={team} 
                        src={`https://assets.nhle.com/logos/nhl/svg/${team}_light.svg`}
                        alt={team}
                        className={`h-15 w-15 border ${team === favteam ? "border-green-500" : "border-transparent"} `}
                        onClick={() => setFavTeam(team)}
                        ></img>
                    ))}
                </div>
                <h1>{state?.error}</h1>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}