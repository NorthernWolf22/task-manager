import { Task } from "@/app/tasks/page";
import Link from "next/link";

type SingleTaskProps = {
    task: Task;
    onDelete: (id: string) => void;
}

export default function SingleTask({ task, onDelete }: SingleTaskProps) {
    return (
        <div
            className="rounded border bg-white p-4 shadow-sm transition hover:shadow-md"
        >
            <Link href={`/tasks/${task.id}`} className="block">
                <h2 className="text-lg font-semibold">{task.title}</h2>
                {task.content && (
                    <p className="mt-1 text-gray-600">{task.content}</p>
                )}
            </Link>

            <button
                onClick={() => onDelete(task.id)}
                className="mt-3 rounded bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-700"
            >
                Delete
            </button>

            <button
                className="text-blue-600 underline ml-5"
            >
                <Link href={`/tasks/${task.id}`}>Edit</Link>
            </button>
        </div>
    );
}