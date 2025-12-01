"use client";
import Image from "next/image";
import Navbar from "./navbar/page"
import { useRef } from "react";
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import SplitText from 'gsap/SplitText';
import { subtle } from "crypto";


export default function Home() {
  
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(SplitText);

  const container = useRef(null);
  
  const mainText = useRef(null);

  const subText = useRef(null);

  const button = useRef(null);


  useGSAP(() => {
    let split1 = SplitText.create(mainText.current, {type: "words, chars"});
    let split2 = SplitText.create(subText.current, {type: "words, chars"});
    let split3 = SplitText.create(button.current, {type: "words, chars"});
    gsap.from(split1.chars, {
      duration: 1,
      x: 100,
      autoAlpha: 0,
      stagger: 0.02
    })
    gsap.from(split2.chars, {
      delay: 1.5,
      duration: 1,
      x: 100,
      autoAlpha: 0,
    })
    gsap.from(split3.chars, {
      delay: 2.0,
      duration: 1,
      x: 100,
      autoAlpha: 0,
    })
  }, {scope:container});

  return (
    <div className="flex flex-col h-screen w-screen bg-ghostwhite">
      <Navbar></Navbar>
      <div className="w-screen h-[90%] flex flex-row text-white items-center justify-center" ref={container}>
        <div className="w-[90%] h-full flex flex-col justify-center items-center px-8 space-y-2 md:w-2/3 lg:w-2/3">
          <h1 className="w-1/2 font-bold text-black text-xl sm:text-2xl md:text-3xl lg:text-5xl" ref={mainText}>Make predictions, earn points, and rise above your friends on the leaderboard.</h1>
          <h2 className="w-1/2 font-semibold text-black text-sm sm:text-md md:text-lg lg:text-xl" ref={subText}>Puckpredictor is a great place to test your knowledge on the NHL and to understand trends that help decide games.</h2>
          <h2 className="w-1/2 font-semibold text-xl text-black text-center cursor-pointer" ref={button}>Try Now!</h2>
        </div>
        <div className="w-0 md:w-1/3 lg:w-1/3 h-[90%] flex justify-start items-center">
          <img className="h-auto w-auto" src="./mcdavotransparent.png"></img>
        </div>
      </div>
      
    </div>
  );
}
