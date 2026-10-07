"use client";

import { createTask, updateTask } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskFormProps = {
  initialTitle: string;
  initialContent: string;
  taskId: string;
  mode: "edit" | "create";
};

export default function TaskForm({ initialTitle = "", initialContent = "", taskId, mode } : TaskFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [result, setResult]  = useState({});

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    //get the user's JWT token (if token is in storage is is string, if not token will be null)
    const token = localStorage.getItem("token");

    //if user does not have a JWT token, redirect them to login
    if(!token) {
      console.log("You must be logged in to create a task");
      router.push("/login");
      return; //must use return, if token was null this means createTask will NOT be called (it only accepts string)
    }

    if(mode === "create") {
      //fetch the data from the createTask api
      const data = await createTask(token, title, content);
      setResult(data);
      console.log("You have created a task: ", data);
    } else {
      const data = await updateTask(token, taskId!, title, content);
      setResult(data);
      console.log("You have updated a task: ", data);
    }

    //if user successfully creates a task redirect to the /tasks page
    router.push("/tasks");
  }

  

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          className="mt-1 w-full rounded border px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          className="mt-1 w-full rounded border px-3 py-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
      >
        {
          mode === "create" ? "Create Task" : "Update task" 
        }
      </button>
    </form>
  );
}