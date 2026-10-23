import express from "express";
import cors from "cors";

//importing express router objects 
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";

//import dotenv package used to load environment variables (DATABASE_URL & JWT_SECRET) making them accessible to the entire BE (e.g. when used for process.env.DATABASE_URL)
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

//json() is a method provided by express that parses incoming JSON request bodies (from json to js)
app.use(express.json());

//registering grouped routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

//registering a single route
//this request is a method to check if the backend server is running and responding to requests
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//listen() is a method of the express application object. It specifies it is using port 3001. when you use the command npm run dev, the server will start, meaning it is listening for any HTTP requests. The console log will appear in the terminal and confirm the BE is up and running and listening for requests.
app.listen(3001, () => {
  console.log("Backend running on http://localhost:3001");
});

//js to json is serialisation 
//json to js is parsing