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

  useEffect(() => {
    async function loadTasks() {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      //if no token redirect to login page
      if (!token) {
        router.push("/login");
        console.log('tasks page: no user token found');
        return;
      }

      //if the user object doesn't have an id re-direct to login
      if (!user.userId) {
        console.log("No user is stored locally");
        router.push("/login");
        return;
      }

      try {
        const data = await getTasks(token);

        if(data.error === "unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          router.push("/login");
          return;
        }

        if(!Array.isArray(data)) {
          console.log("Expected Task[] but received: ", data);
          return;
        }

        setTasks(data);
        setUser(user);
      } catch (err) {
        console.log("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await deleteTask(token, id);

      if (res.error) {
        console.error("Failed to delete task:", res.error);
        return;
      }

      // Remove from UI
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

        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </Wrapper>
  );
}