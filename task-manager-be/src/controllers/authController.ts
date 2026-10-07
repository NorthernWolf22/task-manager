import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; //node.js library
import { getUserByEmail, createUser } from "../services/users";

//JWT_SECRET is a private value only stored on the BE, it is used to check a users token is genuine
//process.env.JWT_SECRET looks for the JWT_SECRET defined in the .env file, if one is not provided then "dev-secret" would be used instead.
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret"; // replace in production

//auth function must be async because it contains functions like getUserByEmail which itself is async and awaiting a response.  
export async function register(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;

  // 1. Check if user exists - prevents users registering more than once
  const existing = await getUserByEmail(email);
  if (existing) {
    return res.status(400).json({ error: "Email already registered" });
  }

  // 2. Hash password
  // bcrypt → protects the user's password before it is stored in the database e.g. password123 becomes $2b$10$7G (its not encryption)
  //the 10 means it uses 10 characters in the generated version which is more secure
  const hashed = await bcrypt.hash(password, 10);

  // 3. Create user - adds new user to the database with their first and last name, email and the hashed pw
  const user = await createUser(firstName, lastName, email, hashed);

  // 4. Generate JWT
  // JWT → .sign creates a jwt token object it has three arguments (payload, secret, options)
  //payload: here you are adding the users id (created when it was added to the db in the previous line) to the jwt token, if you didn't add this then jwt would not know who the token belonged to.
  //secret: the jwt library uses your secrect (defined in .env) in an algorithm to produce a cryptographic signature known as a 'token' which looks something like this '$2b$10$7G'.
  //options: the option is expiresIn which defines a create date and an expiry date within which the token will be valid.
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

  //the api returns a response as json, an object with the jwt id, the users email and the jwt generated token, this can then be used in subsequent requests from the frontend
  return res.json({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  // 1. Find user
  const user = await getUserByEmail(email);
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // 2. Compare password
  //bcrypt takes the password the user previously stored in the database and checks whether it produces a hash matching the stored hash.
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // 4. Generate JWT
  // JWT → .sign creates a jwt token object it has three arguments (payload, secret, options)
  //payload: here you are adding the users id (created when it was added to the db in the previous line) to the jwt token, if you didn't add this then jwt would not know who the token belonged to.
  //secret: the jwt library uses your secrect (defined in .env) in an algorithm to produce a cryptographic signature known as a 'token' which looks something like this '$2b$10$7G'.
  //options: the option is expiresIn which defines a create date and an expiry date within which the token will be valid.
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });  

  //the api returns a response as json, an object with the jwt id, the users email and the jwt generated token, this can then be used in subsequent requests from the frontend
  return res.json({
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token,
  });
}