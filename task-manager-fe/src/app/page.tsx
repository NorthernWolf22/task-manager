"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Wrapper from "@/components/Wrapper";

/*
  USER JOURNEY:
    -user types homepage in to browser
    -browser sends a http get request to view the homepage
    -next.js renders the initial HTML on server side (SSR). At this point:
        -WORKS: authCheckComplete state (but NOT the setAuthCheckComplete func)
        -DOES NOT WORK: router
        -DOES NOT WORK: localstorage
        -DOES NOT WORK: useEffect
    -the browser is sent the html rendered generated via SSR. At this point it due to the if statement returning NULL, nothing will render for the user
    -the browser downloads the JS bundle which includes:
        -react comp code
        -event listeners
        -use effect
    -react 'HYDRATES' the static html making it fully interactive / functional
    -the code runs the useEffect, token is checked, if it exists the user is redirect but if not, the return code block is now permitted to render.   
*/


export default function Home() {
  const router = useRouter();
  const [isTokenCheckComplete, setIsTokenCheckComplete] = useState(false); //only render the return code block if the state is true.

  useEffect(() => {
    //get token from local storage
    const token = localStorage.getItem("token");
    
    //token check --- if token exists, redirect to tasks page
    if(token) {
      router.push('/tasks');
    } else {
      // No token - it is safe to render homepage
      setIsTokenCheckComplete(true);
    }

  }, [router]);

  //We need to check if the token exists BEFORE it is decided what action to take: if token exists > either redirect user to /tasks  || if no token > render the return's code block
  //the token check requires the local storage API therefore it can only be done within a useEffect AFTER hydration
  //the state is therefore required to prevent the return code block rendering prematurely, before this token check has occured.  
  if(!isTokenCheckComplete) {
    return null;
  }

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">Welcome to task manager</h1>
        <p>Organise your tasks in one easy app.</p>
        <a
          href="/register"
          className="rounded bg-green-600 mt-5 inline-block px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Register
        </a>

        <a
          href="/login"
          className="rounded bg-green-600 ml-5 mt-5 inline-block px-4 py-2 font-semibold text-white hover:bg-green-700"
        >
          Login
        </a>
      </div>
    </Wrapper>
  );
}
