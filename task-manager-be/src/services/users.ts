//DATABASE ACCESS FUNCTIONS

import { prisma } from "../lib/prisma";

//export makes this function accessible outside of this file
//asyncronous function returns a promise.
//the function accepts an argument, the email (type string)
//uses the imported prisma client to access the schema model user, it then uses a method called findUnique to retrieve a user within the user db table where the email matches that of the email parameter   

// Get a user by email (used for login + registration checks)
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  });
}

// Create a new user (used during registration)
export async function createUser(firstName: string, lastName: string, email: string, hashedPassword: string) {
  return prisma.user.create({
    data: {
      firstName, 
      lastName,
      email,
      password: hashedPassword
    }
  });
}

// Get a user by ID (used for authenticated routes)
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  });
}

// Get all users (rarely needed, but useful for admin/debug)
export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { email: "asc" }
  });
}