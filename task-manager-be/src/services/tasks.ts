import { prisma } from "../lib/prisma";

export async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });
}

export async function createTask(userId: string, title: string, content?: string) {
  return prisma.task.create({
    data: {
      userId,
      title,
      content
    }
  });
}

//export makes this function accessible outside of this file

//The function has two parameters: userId (type string) and taskId (type string).

//because this is an async function, it always returns a promise (its async because it queries the db and this takes time)

//the await keyword pauses the function until the promise returned by the prisma query has resolved

//For the prisma query, prisma is used to access the task model in the schema, the findUnique query method queries the database for a specific task where the task's id matches the taskId passed in as a parameter.

//Only once the database query has resolved can the function continue to the if statement. 

//If no task matching the taskId was found in the database OR if the task exists but belongs to a different user then null is returned and the function exits.

//If the task exists and its userId matched the userId parameter the task data is returned as a json object.  

export async function getTaskById(taskId: string, userId: string) {
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if(!task || task.userId !== userId) {
    return null;
  }

  return task;
} 

//ALTERNATIVE WAY OF WRITING THIS FUNCTION
//NOTE: in this function the promise from the prisma query is passed straight to the .then() rather than the resolved result in the above version
// export async function getTaskById(taskId: string, userId: string) {
//   return prisma.task.findUnique({
//     where: { id: taskId },
//   }).then((task) => {
//     if(!task || task.userId !== userId) return null;
//     return task;
//   });
// }

export async function updateTaskById(taskId: string, data: {title?: string; content?:string}) {
  return prisma.task.update({
    where: { id: taskId },
    data
  });
}

export async function deleteTaskById(taskId:string) {
  return prisma.task.delete({
    where: { id: taskId }
  });
}