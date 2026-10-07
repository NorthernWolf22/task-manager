//ES named imports: importing specific functions from the express package 
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { getUserById } from "../services/users";

//auth is middleware. Its job is to check that any request made to the /tasks route comes from an authenticated user

//JWT_SECRET is a private value only stored on the BE, it is used to check a users token is genuine
//process.env.JWT_SECRET looks for the JWT_SECRET defined in the .env file, if one is not provided then "dev-secret" would be used instead.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

//auth function must be async because it contains the getUseById function which itself is async and awaiting a response.  
export async function auth(req: Request, res: Response, next: NextFunction) {
  //checks the req headers of the http request, it looks for something to match this format: Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
  const header = req.headers.authorization;

  //if the header doesn't match this format the request is rejected
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //if the header passes the check, split it to create this ["Bearer", "eyJhbGciOiJIUzI1NiIs..."], isolate the token part and store it as the variable token 
  const token = header.split(" ")[1];

  try {
    //jwt is an object imported from the jsonwebtoken package. 
    //verify is a jwt method which checks if the token provided is valid by comparing the token sent from the browser in the http request to the secret code it was originally created with (located in .env). If it determines that the token was created by the BE's secret it is verified as authentic.
    //as {id:string} is not part of the jwt check. it is only here to explicitly state that the id sent in the http request is a string type.
    const payload = jwt.verify(token, JWT_SECRET) as { id: string };

    //check that the user id included in the jwt payload actually exists in the database, if not the http request will be rejected
    const user = await getUserById(payload.id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Attach user to request
    (req as any).user = user;

    //using next allows the middleware to move on once its check is finished to the next step (in routes/tasks.ts the next step was to execute the code in taskController.ts)
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized" });
  }
}