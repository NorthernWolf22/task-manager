//This file centralises all backend calls
//It contains two API functions that your frontend can use to communicate with your Node/Express backend

const BASE_URL = "http://localhost:3001"; //stores the URL your be is running on

//export makes this function accessible outside of this file
//this is an asynchronous function called registerUser
//it accepts two parameters (email/password) both string types

//fetch is a JavaScript API for making HTTP requests.
//the fetch api accepts two arguments: the endpoint your are sending the request to (localhost:3001/auth/register) and the request object
//async functions return a promise so we have to await (pause) until the BE resolves this promise and sends a response.
//JSON.stringify serialises (converts) your JS data into json 
//res.json() takes the response (which will be json) sent from the be and parses it back to JS to use clientside. e.g. it may send a res like this {message: 'users registered successfully'} 


export async function registerUser(firstName: string, lastName: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      firstName,
      lastName,
      email, 
      password 
    }),
  });

  return res.json();
}

export async function loginUser(firstName: string, lastName: string, email: string, password: string) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName, 
      email, 
      password 
    }),
  });

  return res.json();
}

export async function getTasks(token: string) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function createTask(token: string, title: string, content?: string) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}` 
    },
    body: JSON.stringify({
      title, 
      content
    })
  });

  return res.json();
}

export async function deleteTask(token: string, taskId: string) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json();
}

export async function getTaskById(token: string, id: string) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.json();
}

export async function updateTask(token: string, taskId: string, title: string, content?: string) {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", 
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      title, 
      content
    })
  });

  return res.json();
}