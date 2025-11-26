"use client";
import Image from "next/image";
import Navbar from "./navbar/page"

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen bg-blue-300">
      <Navbar></Navbar>
      <div className="w-screen h-[90%] flex flex-row text-white items-center justify-center">
        <div className="w-1/2 h-full flex flex-col justify-center items-end px-8 space-y-2">
          <h1 className="w-1/2 font-bold text-5xl">Make predictions, earn points, and rise above your friends on the leaderboard.</h1>
          <h2 className="w-1/2 font-semibold text-xl">Puckpredictor is a great place to test your knowledge on the NHL and to understand trends that help decide games.</h2>
        </div>
        <div className="w-1/2 h-[90%] flex justify-start items-center">
          <img className="h-3/4 w-fit" src="./mcdavotransparent.png"></img>
        </div>
      </div>
    </div>
  );
}
