"use client";

import { useActionState, useState } from "react";
import { login } from "./actions";

export default function Login() {

    const [state, loginAction] = useActionState(login, undefined);
    const [favteam, setFavTeam] = useState('ANA');

    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="justify-center items-center w-1/2 h-auto bg-blue-200 hidden xs:hidden sm:hidden md:flex lg:flex xl:flex">
                <img src="./z_transparent.png"></img>
            </div>
            <div className="h-full flex flex-col justify-center items-center text-center space-y-4 w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <h1 className="font font-bold text-3xl select-none">Log into your account</h1>
                <h1 className="font-semibold text-md text-gray-600">Enter your email and password to access your account.</h1>
                <form action={loginAction} className="w-1/2 flex flex-col items-center space-y-2">
                    <input type="text" placeholder="Email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    <input type="password" placeholder="Password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></input>
                    <h1 className="text-md font-semibold text-red-600">{state?.error}</h1>
                    <h1 className="text-md">Don't have an account? <a className="font-semibold cursor-pointer" href="/signup">Sign up</a></h1>
                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    );
}