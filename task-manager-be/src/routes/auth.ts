//The main purpose of this file is to define the HTTP endpoints related to authentication and connect each endpoint to the appropriate controller function


//imports the express Router function used to create a Router, which allows you to group related routes together
import { Router } from "express";
import { register, login } from "../controllers/authController";

//Router() calls the Router function to create a Router and store it in a variable called router.
//router is the express Router object, it has methods like: .get(), .post(), .put(), .patch(), .delete(), .use()
const router = Router();

//REGISTER A ROUTE
//if the server directs us here it is because the browser sent a http request like /auth/something-here
//if the full browser request was for /auth/register, the matching route will trigger the specified api function (register) found in the controller. 
router.post("/register", register);

//if the full browser request was for /auth/login, the matching route will trigger the specified api function (login) from in the controller.
router.post("/login", login);

export default router;