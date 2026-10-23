"use client";

import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Task } from "@/types/types";
import Wrapper from "@/components/Wrapper";
import TaskList from "@/components/TaskList";

type User = {
  userId: string;
  firstName: string;
  lastName: string;
};

export default function Page() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    userId: "",
    firstName: "",
    lastName: ""
  });

  //if getTasks fetch returns an error, store error msg to provide feedback. 
  //The type of error would be http request with incorrect endpoint / server not running 
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadTasks() {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      //if no token redirect to login page
      if (!token) {
        router.push("/login");
        return;
      }

      //if the user object doesn't have an id re-direct to login
      if (!user.userId) {
        router.push("/login");
        return;
      }

      try {
        //use the token from local storage to ensure the user is authorised to get their tasks
        const data = await getTasks(token);

        //if the getTasks API returns an error indicating the token is unauthorised clear local storage and redirect to login 
        if (data.error === "unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }

        //if the getTasks API returns an error prevent data with an incorrect type from being stored in tasks state 
        if (!Array.isArray(data)) {
          return;
        }

        setTasks(data);
        setUser(user);
      } catch (err) {
        //if problem retrieving tasks from the backend log the actual err and set a user friendly error message
        console.log("Failed to fetch tasks:", err);
        setError("We couldn't load the tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    //if no token redirect to login page
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      //use the token from local storage and the task id to ensure the user is authorised to delete their task.
      const res = await deleteTask(token, id);

      //if the response returned an error render error feedback
      if (res.error) {
        console.error("Failed to delete task:", res.error);
        return;
      }

      //if res indicates the deletion was successful remove the task from the UI
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }


  if (loading) {
    return (
      <Wrapper>
        <div className="min-h-screen bg-gray-50 p-6">
          <p>Loading...</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">{user.firstName}'s tasks</h1>

        {
          error && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded border border-red-300 bg-red-50 p-3 text-red-700"
            >
              {error}
            </div>
          )
        }

        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </Wrapper>
  );
}