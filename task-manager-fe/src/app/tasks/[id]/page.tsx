"use client";

import { getTaskById } from "@/lib/api";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Task } from "@/types/types";
import Wrapper from "@/components/Wrapper";
import TaskForm from "@/components/TaskForm";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); //the task's id
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTask() {
      //get the token from local storage
      const token = localStorage.getItem("token");

      //if token does not exist redirect to login
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const data = await getTaskById(token, id);

        setTask(data);
      } catch (err) {
        console.error("Failed to load task:", err);
      } finally {
        setLoading(false);
      }
    }

    loadTask();
  }, [id, router]);

  if (loading) return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <p>Loading task...</p>
      </div>
    </Wrapper>
  );

  if (!task) return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <p>Task not found...</p>
      </div>
    </Wrapper>
  );

  return (
    <Wrapper>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">Edit Task</h1>

        <TaskForm
          initialTitle={task.title ?? ""}
          initialContent={task.content ?? ""}
          taskId={task.id}
          mode="edit"
        />
      </div>
    </Wrapper>
  );
}