"use client";
import Image from "next/image";
import Navbar from "./navbar/page"

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen bg-ghostwhite">
      <Navbar></Navbar>
      <div className="w-screen h-[90%] flex flex-row text-white items-center justify-center">
        <div className="w-1/2 h-full flex flex-col justify-center items-center px-8 space-y-2">
          <h1 className="w-1/2 font-bold text-5xl text-black">Make predictions, earn points, and rise above your friends on the leaderboard.</h1>
          <h2 className="w-1/2 font-semibold text-xl text-black">Puckpredictor is a great place to test your knowledge on the NHL and to understand trends that help decide games.</h2>
          <h2 className="w-1/2 font-semibold text-xl text-black underline text-center cursor-pointer">Try Now!</h2>
        </div>
        <div className="w-1/2 h-[90%] flex justify-center items-center">
          <img className="h-3/4 w-fit" src="./mcdavotransparent.png"></img>
        </div>
      </div>
    </div>
  );
}
