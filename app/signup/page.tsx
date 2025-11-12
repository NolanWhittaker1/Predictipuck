"use client";

import { useActionState, useState } from "react";
import { signup } from "./actions";

export default function Signup() {
    const nhlTeams = ["ANA","BOS","BUF","CAR","CBJ","CGY","CHI","COL","DAL","DET","EDM","FLA","LAK","MIN","MTL","NJD","NSH","NYI","NYR","OTT","PHI","PIT","SEA","SJS","STL","TBL","TOR","UTA","VAN","VGK","WPG","WSH"];
    const [state, loginAction] = useActionState(signup, undefined);
    const [favteam, setFavTeam] = useState('ANA');

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-1/2 h-full flex items-center justify-center bg-blue-200">
                <img src="quinn_hughes.png"></img>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center space-y-4">
                <h1 className="font font-bold text-3xl select-none">Start making predictions today!</h1>
                <form action={loginAction} className=" w-3/4 flex flex-col space-y-2 text-center">
                <input type="text" placeholder="Username" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <input type="text" placeholder="Email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <input type="password" placeholder="Password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                <input type="hidden" name="favteam" defaultValue={favteam}></input>
                <div className="flex flex-row flex-wrap items-center justify-center">
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
                <h1 className="text-md font-semibold text-red-600">{state?.error}</h1>
                <h1 className="text-md">Already have an account? <a className="font-semibold cursor-pointer" href="/login">Login</a></h1>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Sign Up</button>
            </form>
            </div>
        </div>
    );
}