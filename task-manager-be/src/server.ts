//ES module import: importing the default export from the express package and giving it the local name 'express', after this point 'express' refers to the Express library's main function
import express from "express";
//ES module import: importing the default export from the cors package, after this point 'cors' refers to the cors's library's main function
import cors from "cors";

//importing express router objects 
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

//ES module import(check this): importing the dotend package, it is used to load environment variables like (DATABASE_URL & JWT_SECRET) from the .env file in to Node.js making them accessible in all of the BE project files (e.g. when used for process.env.DATABASE_URL)
import dotenv from "dotenv";

//invokes the config method of the dotenv object 
dotenv.config();

//The express library's main function is used to create an express application object, storing it in the app variable.
//it has methods like .use(), .get(), .post(), .listen()
const app = express();

//.use() is a method of the Express application object, it is used to register middleware
//middleware is code that express runs as part of processing an HTTP request
//cors() is a function imported from the cors package, an object is passed detailing configuration options. Here we are telling cors which origin is permitted to make cross-origin requests to the backend. Essentially allowing the BE to accept requests from the FE.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//.use() is a method of the Express application object, it is used to register middleware
//middleware is code that express runs as part of processing an HTTP request
//json() is a method provided by express that parses incoming JSON request bodies (from json to js)
app.use(express.json());

//.use() is a method of the Express application object, it is used to register middleware
//middleware is code that express runs as part of processing an HTTP request
//it has two arguments: the path prefix and the express router object.
//ordinarily if the FE sends a http request, it is received in the BE by a matching route e.g. if a post request for the "auth/login" route occurs it would match this app.post("auth/login", login); meaning the login function, in the controller, is triggered. This login function will dictates the BE response to the route.
//however, instead of writing them all here, if you have related routes you can group them together. Now if any route with "auth" occurs it directs the BE to use the matching route e.g. "login" from the authRoutes instead. That matching route is appended to "auth" meaning you end up with "auth/login".

//registering grouped routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

//registering a single route
//when the BE receives a HTTP GET request matching this path (/health), it executes the function
//two parameters request & response. They are express objects
//req contains info about the incoming request req.body, req.param, req.query, req.headers, req.method
//res provides methods for creating HTTP response res.json(), res.send(), res.status()
//express serialises the response object in to JSON and sends it back to the client
//this request is a good way of checking if the backend server is running and responding to requests
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//listen() is a method of the express application object. It specifies it is using port 3001. when you do npm run dev, this will start your server, meaning it is listening for any HTTP requests. The console log will appear in the terminal and confirm the BE is up and running and listening for requests.
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});



//js to json is serialisation 
//json to js is parsing