"use client";

import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type AuthFormProps = {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const data =
      type === "login"
        ? await loginUser(formData.firstName, formData.lastName, formData.email, formData.password)
        : await registerUser(formData.firstName, formData.lastName, formData.email, formData.password);
    console.log(`${type} response:`, data);

    //store the JWT + user info in the browsers local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({
      userId: data.userId,
      firstName: data.firstName,
      lastName: data.lastName 
    }));

    //redirect user to the tasks route
    router.push("/tasks");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {
        type === "register" ? (
          <>
            <div>
              <label className="block text-sm font-medium" htmlFor="firstName">First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="e.g. John"
                className="mt-1 w-full rounded border px-3 py-2"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="lastName">LastName</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="e.g. Doe"
                className="mt-1 w-full rounded border px-3 py-2"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <></>
        )
      }

      <div>
        <label className="block text-sm font-medium" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="e.g. johnDoe@gmail.com"
          className="mt-1 w-full rounded border px-3 py-2"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}