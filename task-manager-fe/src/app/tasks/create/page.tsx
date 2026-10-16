"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Wrapper from "@/components/Wrapper";
import TaskForm from "@/components/TaskForm";

export default function Page() {
  const router = useRouter();
  const [isTokenCheckComplete, setIsTokenCheckComplete] = useState(false); //only render the return code block if the state is true.

  useEffect(() => {
    //get token from local storage
    const token = localStorage.getItem("token");

    //token check --- if token does not exist redirect user to login
    if (!token) {
      router.push('/login');
    } else {
      setIsTokenCheckComplete(true);
    }

  }, [router]);

  //We need to check if the token exists BEFORE it is decided what action to take: if token exists > either redirect user to /login  || if no token > render the return's code block
  //the token check requires the local storage API therefore it can only be done within a useEffect AFTER hydration!
  //the state is therefore required to prevent the return code block rendering prematurely, before this token check has occured.  
  if (!isTokenCheckComplete) {
    return null;
  }

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">Create Task</h1>

        <TaskForm
          initialTitle=""
          initialContent=""
          taskId=""
          mode="create"
        />
      </div>
    </Wrapper>
  );
}