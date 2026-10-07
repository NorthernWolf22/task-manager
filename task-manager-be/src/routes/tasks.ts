//The main purpose of this file is to define the HTTP endpoints related to tasks and connect each endpoint to the appropriate controller function


//ES named imports: rather than importing the entire express package, this just imports the router function. 
//router allows you to create a router object letting you group related routes together. 
import { Router } from "express";
import { auth } from "../middleware/auth";
import { getTasksController, createTaskController, getTaskByIdController, updateTaskByIdController, deleteTaskByIdController } from "../controllers/taskController";

//create an express router using the router function and store it in a variable called router.
//the router object has methods like: .get(), .post(), .put(), .patch(), .delete(), .use()
const router = Router();

//if the server directs us here it is because the browser sent a http request like /tasks/something-here.  
//in this instance the path "/" means the matching route is just '/tasks' with nothing to apend to it
//auth is middleware for this route. Its job is to check that the request is coming from an authenticated user
//if user is authenticated the specified api function (getTasksController) executes 
router.get("/", auth, getTasksController);
router.post("/", auth, createTaskController);
router.get("/:id", auth, getTaskByIdController);
router.put("/:id", auth, updateTaskByIdController);
router.delete("/:id", auth, deleteTaskByIdController);

export default router;