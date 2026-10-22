<h1>Task manager - frontend</h1>

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
<p>Task Manager’s frontend is a responsive, client‑side application built with Next.js, React, and TypeScript. It provides the full user interface for authentication, task creation, editing, and deletion, with dynamic routing and protected pages that ensure only authenticated users can access task data. Client‑side token management is used to verify user sessions, handle authorisation errors, and control access to sensitive routes. The UI is structured around reusable components, typed form handling, and clear validation flows, delivering a smooth user experience backed by predictable state management and strong TypeScript safety throughout.
</p>

<h3>Tech stack</h3>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)

<h3>Key features</h3>
<h3>Next.js</h3>
<ul>
    <li><p><strong>Dynamic routes - </strong>Utilised dynamic routing to render a specific task using the task id as the parameter</p></li>
    <li><p><strong>Links - </strong>Link is Next.js’s built‑in, performance‑optimised navigation component that gives you fast client‑side routing with automatic prefetching and seamless page transitions</p></li>
    <li><p><strong>Meta data - </strong>Utilised the metadata object that Next.js uses to populate the HTML title and description tags</p></li>
    <li><p><strong>Not found routes - </strong> Directs users to a custom not found page if any attempts to navigate to pages which do not exist</p></li>
</ul>

<h3>Typescript</h3>
<ul>
    <li><p><strong>Type alias - </strong>Created custom aliases for form data, componenent props and UI state models using the type keyword</p></li>
    <li><p><strong>Strongly typed - </strong>Used strongly typed data throughout e.g. useState< ContactFormData></p></li>
    <li><p><strong>Prop types - </strong>Defined custom prop type aliases within components</p></li>
    <li><p><strong>Parameter types - </strong>Typed function parameters to enforce the structure of the expected incoming arguments</p></li>
    <li><p><strong>Function returns - </strong>Explicitly declared function return types e.g. void for improved code clarity and type safety</p></li>
    <li><p><strong>Array types - </strong>Used array typing (Task[]) to ensure collections only contain valid task objects</p></li>
    <li><p><strong>String literal types - </strong>Used string literal typing (type = "login") to constrain component modes and ensure only valid values are passed</p></li>
    <li><p><strong>Union types - </strong>Used union types to model optional data and enforce correct null checking in components e.g. Task | null</p></li>
    <li><p><strong>Discriminated union types & type narrowing - </strong>Implemented discriminated union types allowing TypeScript to safely narrow form fields e.g. AuthFormData within AuthForm</p></li>
    <li><p><strong>Intersection type operator - </strong>Extending a type by combining it with another to build richer, structured data models e.g. RegisterFormData & {type: "register"}</p></li>
    <li><p><strong>Optional properties - </strong>Used optional properties to handle data safely</p></li>
    <li><p><strong>Functions as props - </strong>Passed typed functions as props between parent and child components</p></li>
    <li><p><strong>Type inference - </strong>Leveraged TypeScript's type inference for local component state objects</p></li>
    <li><p><strong>Event handlers - </strong>Typed React event handlers (e.g. ChangeEvent, SubmitEvent for the AuthForm component)</p></li>
    <li><p><strong>Utility types - </strong>Used utility types (Partial<Record<...>>) for field-level validation errors, this approach ensures the contact form error state type will be automatically updated should there be changes made to the form field schema inferred by zod, they are synchronised</p></li>
    <li><p><strong>Custom aliases - </strong>Implemented type-safe state management with custom type aliases</p></li>
    <li><p><strong>Using typescripts built in features - </strong>Leveraged TypeScript's keyof operator for dynamic error mapping</p></li>
    <li><p><strong>Type‑safe error handling - </strong>Typed error responses from the backend to ensure predictable client-side error behaviour e.g. { error: string }</p></li>
</ul>

<h3>React</h3>
<ul>
  <li><p><strong>Architecture - </strong>Built a component-based application architecture</p></li>
  <li><p><strong>Hooks - </strong>Managed application data with state hooks (useState, useRouter, useEffect, etc)</p></li>
  <li><p><strong>Controlled inputs - </strong>Implemented controlled form inputs using React state</p></li>
  <li><p><strong>Avoiding state mutation - </strong>Used state immutability patterns when updating arrays and objects</p></li>
  <li><p><strong>Spread operator - </strong>Amended state or passed props using the spread operator</p></li>
  <li><p><strong>Array methods - </strong>Rendered dynamic data by using the .map() method</p></li>
  <li><p><strong>Callback props - </strong>Used callback props to allow child components to trigger parent state updates</p></li>
  <li><p><strong>Reusable components - </strong>Built reusable components e.g. AuthForm component</p></li>
  <li><p><strong>Configurable components - </strong>Created components which can be configured depending on requirements by using prop driven design techniques e.g. AuthForm can be configured for use as a login or register form</p></li>
  <li><p><strong>Form submissions - </strong>Implemented form submission handling with use of .preventDefault() method and handled form data collection.</p></li>
  <li><p><strong>Accessibility - </strong>Colour contrast was considered to ensure WCAG compliance and created fully accessible form fields using semantic tags, arias and providing strong feedback for submission errors.</p></li>
  <li><p><strong>Conditional classes - </strong>Use of conditional class rendering to ensure correct fields and errors are rendered</p></li>
</ul>

<h3>Zod</h3>
<ul>
    <li><p><strong>Schema - </strong>Defined a strongly typed validation schema for the authentication form</p></li>
    <li><p><strong>Inference - </strong>Generated TypeScript types directly from the validation schema</p></li>
    <li><p><strong>String validation - </strong>Applied string validation (min, max, trim, email)</p></li>
    <li><p><strong>Runtime validation - </strong>Used safeParse() to perform runtime validation without throwing exceptions</p></li>
    <li><p><strong>Transforming data - </strong>Transforming the issues returned from zod, converting them in to a format easier to access in the UI to validate form field errors</p></li>
</ul>

<h3>Project structure</h3>
<p>The project structure for the frontend highlights the architectural approach, folder organisation, and naming conventions that support a scalable and maintainable codebase.</p>

<div>
    <details>
        <summary><strong>src</strong></summary>
        <ul>
            <li>
                app
                <ul>
                    <li>
                        login
                        <ul>
                            <li>page.tsx</li>
                        </ul>
                    </li>
                    <li>
                        register
                        <ul>
                            <li>page.tsx</li>
                        </ul>
                    </li>
                    <li>
                        tasks
                        <ul>
                            <li>
                                [id]
                                <ul>
                                    <li>page.tsx</li>
                                </ul>
                            </li>
                            <li>
                                create
                                <ul>
                                    <li>page.tsx</li>
                                </ul>
                            </li>
                            <li>page.tsx</li>
                        </ul>
                    </li>
                    <li>
                        layout.tsx
                    </li>
                    <li>
                        note-found.tsx
                    </li>
                    <li>
                        page.tsx
                    </li>
                </ul>
            </li>
            <li>
                components
                <ul>
                    <li>AuthForm.tsx</li>
                    <li>...</li>
                </ul>
            </li>
            <li>
                lib
                <ul>
                    <li>api.ts</li>
                    <li>validation.ts</li>
                </ul>
            </li>
            <li>
                types
                <ul>
                    <li>types.ts</li>
                </ul>
            </li>
        </ul>
    </details>
</div>

<h3>Set up & Installation</h3>
<p>Once the backend installation is complete (see backend README), open a second terminal, then install and run the frontend with the following commands in the order provided:</p>
<ol>
  <li>cd task-manager</li>
  <li>cd task-manager-fe</li>
  <li>npm install</li>
  <li>npm run dev</li>
</ol>

<h3>Future improvements</h3>
<ul>
  <li>Increase server side rendering (SSR) usage to facilitate loading, error, global-error and nested not-found page inclusion</li>
</ul>