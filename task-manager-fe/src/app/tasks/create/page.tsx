"use client";

import Layout from "@/components/Layout";
import TaskForm from "@/components/TaskForm";

export default function Page() {

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="mb-6 text-3xl font-bold">Create Task</h1>

        <TaskForm 
          mode="create"
        />
      </div>
    </Layout>
  );
}