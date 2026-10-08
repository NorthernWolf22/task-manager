"use client";

import { LoginSchema, LoginFormData, RegisterSchema, RegisterFormData } from "@/lib/validation";
import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

//define a discriminated union
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>> & { type: "register" };
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>> & { type: "login" };

type AuthFormErrors = RegisterFormErrors | LoginFormErrors;


//define a discriminated union
type RegisterFormState = RegisterFormData & { type: "register" };
type LoginFormState = LoginFormData & { type: "login" };

type AuthFormData = RegisterFormState | LoginFormState;

type AuthFormProps = {
  type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<AuthFormData>(
    type === "register" ?
      {
        type: "register",
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      } : {
        type: "login",
        email: "",
        password: ""
      });

  const [errors, setErrors] = useState<AuthFormErrors>(
    type === "register"
      ? { type: "register" }
      : { type: "login" }
  );

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

    const result =
      type === "register"
        ? RegisterSchema.safeParse(formData)
        : LoginSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: AuthFormErrors =
        formData.type === "register"
          ? { type: "register" }
          : { type: "login" };

      result.error.issues.forEach(issue => {
        const field = issue.path[0] as Exclude<keyof AuthFormErrors, "type">;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    let data;

    if (formData.type === "login") {
      data = await loginUser(formData.email, formData.password);
    } else {
      data = await registerUser(formData.firstName, formData.lastName, formData.email, formData.password);
    };
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

  console.log('authform errors: ', errors);

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {
        formData.type === "register" ? (
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
                aria-describedby={errors.type === "register" ? "firstNameError" : undefined }
              />

              {
                errors.type === "register" && errors.firstName &&
                <div>
                  <p id="firstNameError">{errors.firstName}</p>
                </div>
              }
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
                aria-describedby={errors.type === "register" ? "lastNameError" : undefined }
              />

              {
                errors.type === "register" && errors.lastName &&
                <div>
                  <p id="lastNameError">{errors.lastName}</p>
                </div>
              }
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
          aria-describedby={errors ? "emailError" : undefined }
          aria-invalid={!!errors.email}
        />

        {
          errors.email &&
          <div>
            <p id="emailError">{errors.email}</p>
          </div>
        }
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
          aria-describedby={errors ? "passwordError" : undefined }
          aria-invalid={!!errors.password}
        />

        {
          errors.password &&
          <div>
            <p id="passwordError">{errors.password}</p>
          </div>
        }
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