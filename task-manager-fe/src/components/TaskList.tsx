"use client";
import { Task } from "@/app/tasks/page";
import Link from "next/link";
import SingleTask from "@/components/SingleTask";

type TaskListProps = {
  tasks: Task[],
  onDelete: (id: string) => void;
};

export default function TaskList({ tasks, onDelete } : TaskListProps) {
  console.log('on task list: ', tasks);  

  return (
    <div className="space-y-3">
      {tasks?.map((task: Task) => (
        <SingleTask
          key={task.id}
          task={task} 
          onDelete={onDelete}
        />
      ))}

      {!tasks || tasks.length < 1 &&
        <p>There are no tasks to show</p>
      }
    </div>
  );
}