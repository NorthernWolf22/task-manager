import { Request, Response } from "express";
import { createTask, deleteTaskById, getTaskById, getTasks, updateTaskById } from "../services/tasks";

export async function getTasksController(req: Request, res: Response) {
  const user = (req as any).user;

  try {
    const tasks = await getTasks(user.id);
    return res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
}

export async function createTaskController(req: Request, res: Response) {
  const user = (req as any).user;
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const task = await createTask(user.id, title, content);
    return res.status(201).json(task);
  } catch (err) {
    console.error("Error creating task:", err);
    return res.status(500).json({ error: "Failed to create task" });
  }
}

export async function getTaskByIdController(req: Request, res: Response) {
  const user = (req as any).user;
  const id = req.params.id as string;

  try {
    const task = await getTaskById(id, user.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json(task);
  } catch (err) {
    console.error("Error fetching task: ", err);
    return res.status(500).json({ error: "Failed to fetch the task" });
  }
}

export async function updateTaskByIdController(req: Request, res: Response) {
  const user = (req as any).user; //the user which passed the authentication middleware stage where it was added to the request body
  const id = req.params.id as string; //the id of that user
  const { title, content } = req.body; //the task properties submitted by the form

  try {
    const existing = await getTaskById(id, user.id);

    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updated = await updateTaskById(id, { title, content });

    return res.json(updated);
  } catch (err) {
    console.error("Error updating the task: ", err);
    return res.status(500).json({ error: "Failed to update the task" });
  }
}

export async function deleteTaskByIdController(req: Request, res: Response) {
  const user = (req as any).user; //retrieves the user from the request to which is was added when it passed the authentication middleware stage
  const id = req.params.id as string; //the task id from the URL e.g. /tasks/<id>

  try {
    const existing = await getTaskById(id, user.id); //checking the task exists in the db and that the task you are trying to delete was created by this user (a user can only delete their own tasks) 

    // If the task doesn't exist OR belongs to another user, return 404
    if (!existing) {
      return res.status(404).json({ error: "Task not found" });
    }

    //if task exists and the post belongs to them - deleted it.
    const deleted = await deleteTaskById(id);

    return res.json(deleted); //the delete task object is returned to the user 
    // e.g.{
    //     "id": "f30a7854-559c-43f4-bf79-f864d600e82a",
    //     "title": "Buy milk",
    //     "content": "Semi-skimmed, Asda brand",
    //     "createdAt": "2026-10-01T17:02:19.173Z",
    //     "userId": "ac9ddb4e-7337-4ca3-8fd6-84a47b7a770b"
    // }
  } catch (err) {
    //This catches unexpected server errors (DB issues, Prisma errors, etc.)
    console.error("Error deleting the task: ", err);
    return res.status(500).json({ error: "Failed to delete the task"});
  }
}