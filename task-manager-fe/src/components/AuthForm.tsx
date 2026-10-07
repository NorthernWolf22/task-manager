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
              <label className="block text-sm font-medium">First name</label>
              <input
                name="firstName"
                type="text"
                className="mt-1 w-full rounded border px-3 py-2"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">LastName</label>
              <input
                name="lastName"
                type="text"
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
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          className="mt-1 w-full rounded border px-3 py-2"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
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