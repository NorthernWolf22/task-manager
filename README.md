<h1>Task manager</h1>

<h3>Overview</h3>
<p>This repository contains a full‑stack task management application built with Next.js, React and TypeScript for the frontend and Node.js, Express and PostgreSQL via Prisma ORM for the backend. The project demonstrates a clean separation of concerns between client and server, strongly typed data models across the entire stack, and a secure authentication flow powered by JWT (JSON web token).

The application allows users to register, log in, and manage their personal tasks through a responsive, component‑driven UI. The frontend is built with modern React patterns, typed form handling, and predictable state management, ensuring a smooth user experience and reliable client‑side validation. All interactions with the backend are performed through typed API calls, giving the client full awareness of expected request and response shapes.

On the server side, the Express API provides a clear set of RESTful endpoints for authentication and task operations, each protected by middleware that verifies JWTs and attaches the authenticated user to the request. Prisma acts as the ORM layer, offering strongly typed database models, safe queries, and a clean abstraction over PostgreSQL hosted via Neon a cloud-based platform. The backend includes structured controllers, typed middleware, and consistent error handling, making the API predictable and easy to extend.

Together, the two halves form a cohesive full‑stack system that highlights practical TypeScript usage, secure authentication design, and clean architectural boundaries.</p>

<h3>Set up & Installation</h3>
<p>To clone the project open a command line terminal and run the following command, then action the additional instruction. Once complete please refer to the README.md document in the task-manager-be folder to continue with the next step of the installation process.</p>
<ol>
  <li>git clone https://github.com/NorthernWolf22/task-manager.git</li>
  <li>Prior to installing/running the backend, create a .env file under the task-manager-be folder and add your environment variables:          
     <ul>
        <li>DATABASE_URL=< your PostgreSQL connection string></li>
        <li>JWT_SECRET=< your JWT secret></li>
     </ul>
  </li>
</ol>