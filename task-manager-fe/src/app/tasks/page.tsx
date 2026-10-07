"use client";

import { useEffect, useState } from "react";
import TaskList from "@/components/TaskList";
import Layout from "@/components/Layout";
import { deleteTask, getTasks } from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  userId: string;
  firstName: string;
  lastName: string;
};

export type Task = {
  id: string;
  title: string;
  content: string | null;
  createdAt: string;
  userId: string;
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
        return;
      }

      //if no user object is found
      if(!user) {
        console.log("No user is stored locally");
        return; 
      }

      try {
        const data = await getTasks(token);

        //if unauthorised, redirect
        if (data.error === "unauthorized") {
          console.log("User unauthorised, redirecting to login page");
          router.push("/login");
        }

        //if data is not an array prevent crash
        if (!Array.isArray(data)) {
          console.error("Expected an array of tasks but got: ", data);
          setTasks([]);
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

  if (loading) {
    return <p>Loading tasks...</p>
  }

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


  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">{user.firstName}'s tasks</h1>

        <TaskList tasks={tasks} onDelete={handleDelete} />
      </div>
    </Layout>
  );
}