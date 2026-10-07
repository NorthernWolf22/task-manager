"use client";

import Layout from "@/components/Layout";
import TaskForm from "@/components/TaskForm";
import { getTaskById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Task } from "../page";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); //the task's id
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await getTaskById(token, id);

        if (data.error === "unauthorized") {
          console.log("You are not authorized to access or edit this task");
          router.push("/login");
          return;
        }

        setTask(data);
      } catch (err) {
        console.error("Failed to load task:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTask();
  }, [id, router]);

  if (loading) return <p>Loading task...</p>;
  if (!task) return <p>Task not found.</p>;

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">Edit Task</h1>

        <TaskForm 
          initialTitle={task.title ?? ""}
          initialContent={task.content ?? ""}
          taskId={task.id}
          mode="edit"
        />
      </div>
    </Layout>
  );
}
