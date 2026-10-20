<h1>Task manager - backend</h1>

<h2>Table of contents</h2>
<ul>
    <li>Overview</li>
    <li>Tech stack</li>
    <li>Key features</li>
    <li>Project structure</li>
    <li>Installation</li>
    <li>Future improvements</li>
</ul>

<h3>Overview</h3>
<p>Task Manager’s backend is a Node.js and Express REST API responsible for authentication, task storage, and secure data operations. It exposes well‑structured GET, POST, PUT, and DELETE endpoints for managing tasks, all protected by JWT‑based authentication middleware to ensure users can only access their own resources. Prisma ORM provides a strongly typed interface to a PostgreSQL database via Neon a cloud-based host, enabling reliable data modelling, migrations, and queries. The backend includes clear controller logic, meaningful HTTP status codes, structured JSON responses, and robust error handling, forming a secure and predictable foundation for the entire application.
</p>

<h3>Tech stack</h3>

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Neon](https://img.shields.io/badge/Neon-00E599?logo=neon&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?logo=jsonwebtokens&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)

<h3>Key features</h3>
<h3>Typescript</h3>
<ul>
    <li><p><strong>Type alias - </strong>Used custom type aliases for API response models and request body structures e.g. return res.status(400).json({ error: "Email already registered" })</p></li>
    <li><p><strong>Route handlers - </strong>API logic is separated in to the controllers which act as route handlers, their arguments; the request and response objects, facilitate strict routing. e.g. function register(req: Request, res: Response)</p></li>
    <li><p><strong>Middleware - </strong>Typed middleware enforces structure for authentication, validation, and error-handling middleware e.g. function auth(req: Request, res: Response, next: NextFunction)</p></li>
    <li><p><strong>Async functions - </strong>Async functions return a promise e.g. const existing = await getTaskById(id, user.id);</p></li>
    <li><p><strong>Array types - </strong>Used array typing for collections such as Task[] returned from a database query e.g. const tasks = await getTasks(user.id); // tasks: Task[]
</p></li>
    <li><p><strong>String literal types - </strong>Used string literal typing for JWT payload which narrows the type of id to a string literal e.g. const payload = jwt.verify(token, JWT_SECRET) as { id: string };</p></li>
    <li><p><strong>Union types - </strong>Used for modelling optional database results e.g. const existing = await getTaskById(id, user.id); //existing returns Task | null</p></li>
    <li><p><strong>Intersection type operator - </strong>Used to combine several different models together. In the middleware an intersection type is used to add the user to the request type e.g. (req as any).user = user;</p></li>
    <li><p><strong>Optional properties - </strong>Used optional properties to handle data safely e.g. const { title, content } = req.body;
 //content is am optional field</p></li>
    <li><p><strong>Utility types - </strong>Used utility types e.g. const updated = await updateTaskById(id, { title, content });</p></li>
    <li><p><strong>Custom aliases - </strong>Implemented type-safe state management with custom type aliases</p></li>
    <li><p><strong>Using typescripts built in features - </strong>Indirectly used TypeScript's keyof operator when accessing dynamic fields e.g. const id = req.params.id as string;</p></li>
    <li><p><strong>Type‑safe error models - </strong>Used to provide consistent API responses to be consumed by the frontend e.g. return res.status(400).json({ error: "Invalid email or password" });</p></li>
    <li><p><strong>Prisma inference - </strong>Prisma client generates types directly from the defined backend schema e.g. const user = await createUser(firstName, lastName, email, hashed);</p></li>
    <li><p><strong>Type narrowing before database operations - </strong>Ensures validated and safe data is passed to Prisma e.g. if (!existing) { return res.status(404).json({ error: "Task not found" }); }</p></li>
</ul>

<h3>Node.js</h3>
<ul>
    <li><p><strong>Core runtime usage —</strong> Built the backend using Node.js as the JavaScript runtime environment for executing server‑side logic.</p></li>
    <li><p><strong>Module system —</strong> Used ES module imports/exports to organise controllers, middleware, and route handlers into clean, maintainable files.</p></li>
    <li><p><strong>Asynchronous programming —</strong> Implemented async/await throughout the backend for non‑blocking database queries and HTTP request handling.</p></li>
    <li><p><strong>Error handling —</strong> Added structured try/catch blocks in controllers to safely handle API failures and return meaningful JSON error responses.</p></li>
    <li><p><strong>Environment variables —</strong> Used Node’s process.env to securely load configuration values such as database URLs and JSON web tokens (JWT) secrets.</p></li>
    <li><p><strong>File structure —</strong> Organised backend logic into dedicated folders (routes, controllers, middleware, lib) following Node.js best practices.</p></li>
    <li><p><strong>HTTP server fundamentals —</strong> Leveraged Node’s underlying HTTP capabilities via Express to handle RESTful GET, POST, PUT, and DELETE operations.</p></li>
</ul>

<h3>Express</h3>
<ul>
    <li><p><strong>Routing —</strong> Built a full REST API using Express Router, including endpoints for authentication, task creation, task retrieval, updates, and deletion.</p></li>
    <li><p><strong>Middleware —</strong> Implemented custom authentication middleware to validate JWT tokens, protect routes, and ensure users can only access their own tasks.</p></li>
    <li><p><strong>Request validation —</strong> Added structured validation logic in controllers to ensure incoming data is safe and correctly shaped before processing.</p></li>
    <li><p><strong>HTTP status codes —</strong> Returned meaningful status codes (200, 201, 400, 401, 404) to clearly communicate success, validation errors, unauthorized access, and missing resources.</p></li>
    <li><p><strong>JSON responses —</strong> Used Express’s res.json() to send consistent, typed JSON responses consumed by the Next.js frontend.</p></li>
    <li><p><strong>Protected routes —</strong> Secured task‑related endpoints so only authenticated users can create, view, edit, or delete their own tasks.</p></li>
    <li><p><strong>Controller abstraction —</strong> Separated route definitions from business logic using controller functions for cleaner, testable backend architecture.</p></li>
</ul>

<h3>Prisma ORM & PostgreSQL</h3>
<ul>
    <li><p><strong>Relational - </strong>Designed and implemented a relational database schema using Prisma ORM</p></li>
    <li><p><strong>Foreign keys - </strong>Using foreign keys and Prisma @relation fields to maintain related table data</p></li>
    <li><p><strong>Primary keys - </strong>Defining primary keys with auto-incrementing IDs</p></li>
    <li><p><strong>Unique constraints - </strong>Using unique constraints (@unique) to enforce data uniqueness (e.g. task id)</p></li>
    <li><p><strong>Required vs optional fields - </strong>Defining optional and required fields to accurately model application data</p></li>
    <li><p><strong>Default values - </strong>Configuring default values e.g. @default(now()) for timestamps</p></li>
    <li><p><strong>Database queries - </strong>Queried a PostgreSQL database using Prisma ORM</p></li>
    <li><p><strong>DRY principles - </strong>Configured a reusable PrismaClient instance to avoid repeated client creation</p></li>
    <li><p><strong>Prisma query options - </strong>Used Prisma query options (orderBy) to retrieve sorted data</p></li>
    <li><p><strong>Prisma types - </strong>Utilised Prisma-generated TypeScript types for end-to-end type safety</p></li>
</ul>

<h3>Project structure</h3>
<p>The project structure for the backend highlights the architectural approach, folder organisation, and naming conventions that support a scalable and maintainable codebase.</p>

<div>
    <details>
        <summary><strong>prisma</strong></summary>
        <ul>
            <li>schema.prisma</li>
        </ul>
    </details>
    <details>
        <summary><strong>src</strong></summary>
        <ul>
            <li>
                controllers
                <ul>
                    <li>authController.ts</li>
                    <li>taskController.ts</li>
                </ul>
            </li>
            <li>
                lib
                <ul>
                    <li>prisma.ts</li>
                </ul>
            </li>
            <li>
                middleware
                <ul>
                    <li>auth.ts</li>
                </ul>
            </li>
            <li>
                routes
                <ul>
                    <li>auth.ts</li>
                    <li>tasks.ts</li>
                </ul>
            </li>
            <li>
                services
                <ul>
                    <li>tasks.ts</li>
                    <li>users.ts</li>
                </ul>
            </li>
            <li>
                server.ts
            </li>
        </ul>
    </details>
</div>

<h3>Set up & Installation</h3>
<p>Open a new terminal, then install and run the backend with the following commands in the order provided. Once complete please refer to the README.md document in the task-manager-fe folder to continue with the final step of the installation process:</p>
<ol>
  <li>cd task-manager</li>
  <li>cd task-manager-be</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>

<h3>Future improvements</h3>
<ul>
  <li>Replace local storage with cookies to ensure token authentication can be done server side</li>  
</ul>