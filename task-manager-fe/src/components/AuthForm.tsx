"use client";

import { LoginSchema, LoginFormData, RegisterSchema, RegisterFormData } from "@/lib/validation";
import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";


// Form state types combine the relevant form data type inferred by zod with a `type` property,
// which identifies whether the form is for registration or login.
type RegisterFormState = RegisterFormData & { type: "register" };
type LoginFormState = LoginFormData & { type: "login" };

// Discriminated union: AuthFormData can represent either a registration
// or login form state, distinguished by the `type` property.
type AuthFormData = RegisterFormState | LoginFormState;

// Error types allow each form field to have an optional string error message.
// `Partial<Record<keyof ..., string>>` makes every form field key optional,
// with each value being a string error message.
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>> & { type: "register" };
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>> & { type: "login" };

// Discriminated union: AuthFormErrors can represent either registration
// or login form field errors, distinguished by the `type` property.
type AuthFormErrors = RegisterFormErrors | LoginFormErrors;

type AuthFormProps = {
  type: "login" | "register"; //string literal union
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();

  //stores the data from the form fields
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

  //stores message errors returned by zod schema after validation of formData fields
  const [errors, setErrors] = useState<AuthFormErrors>(
    type === "register"
      ? { type: "register" }
      : { type: "login" }
  );

  //stores a message used to provide error feedback for authorisation failures (e.g. if user attempts to log in with wrong email/password)
  const [authError, setAuthError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    //captures changes to each form data field
    setFormData((prevFormData: AuthFormData) => ({
      ...prevFormData,
      [name]: value
    }));

    //resets the validation errors fields if a user is typing in the inputs again
    setErrors((prevErrors: AuthFormErrors) => ({
      ...prevErrors,
      [name]: undefined
    }));

    //removes error message related to incorrect email/password login when user starts typing again
    setAuthError("");
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    // This line checks the form type and passes the data collected from the form fields to the matching zod type schema for validation checks 
    const validation =
      type === "register"
        ? RegisterSchema.safeParse(formData)
        : LoginSchema.safeParse(formData);

  
    //validation stores the response from the zod validation. The response will always have a success property, if true it passed, if false it has failed
    if (!validation.success) {

      if (formData.type === "register") {

        //fieldErrors is initialised as RegisterFormErrors which has only one required property 'type'.
        const fieldErrors: RegisterFormErrors = {
          type: "register"
        };

        //---transforming the data---
        //the block below maps through each error returned by zod, which may look something like this:
        // {
        //   success: false,
        //   error: {
        //     ZodError: [
        //       "origin": "string",
        //       "code": "too_small",
        //       "minimum": 2,
        //       "inclusive": true,
        //       "path": [
        //            "firstName"
        //        ],
        //       "message": "Please enter your first name."
        //     ]
        //   }
        // }
        //The path tells you which field the error belonged to and the message is the error text you can display to provide user feedback.
        //this must be converted in to a format which is easier to access from the UI when validating the fields or providing user feedback. 
        //Post transformation it looks like this:
        //{
        //    fullName: "Please enter your first name."
        //}
        validation.error.issues.forEach((issue) => {
          const field = issue.path[0];

          if (
            field === "firstName" ||
            field === "lastName" ||
            field === "email" ||
            field === "password"
          ) {
            fieldErrors[field] = issue.message;
          }
        });

        setErrors(fieldErrors);
      } else {
        const fieldErrors: LoginFormErrors = {
          type: "login"
        };

        validation.error.issues.forEach((issue) => {
          const field = issue.path[0];

          if (field === "email" || field === "password") {
            fieldErrors[field] = issue.message;
          }
        });

        setErrors(fieldErrors);
      }

      return;
    }
    //If if passes validation, it will return something like this:
    // {
    //   success:true,
    //   data: { 
    //        email: "tom@gmail.com",
    //        password: "kns68^$p"
    //   }
    // }

    //reset error fields to clear old data after successful validation
    setErrors(
      formData.type === "register"
        ? { type: "register" }
        : { type: "login" }
    );

    let data;

    //if validation was successful, use the data collected from form fields to either login / register the user
    if (formData.type === "login") {
      data = await loginUser(formData.email, formData.password);
    } else {
      data = await registerUser(formData.firstName, formData.lastName, formData.email, formData.password);
    };

    //if user attempts to login with non-registered email/pw the error message is stored to be used as user feedback, this prevents storage of bad/ incorrect data
    if (data.error) {
      setAuthError(data.error);
      return;
    }

    //before storing a token, verify it exists. If not, store error message for user feedback:
    if (!data.token) {
      setAuthError("Login failed. Please try again.");
      return;
    }

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
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      {
        formData.type === "register" ? (
          <>
            <div>
              <label className="block text-sm font-medium" htmlFor="firstName">* First name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                placeholder="e.g. John"
                className="mt-1 w-full rounded border px-3 py-2"
                value={formData.firstName}
                onChange={handleChange}
                aria-describedby={errors.type === "register" && errors.firstName ? "firstNameError" : undefined}
                aria-invalid={errors.type === "register" && !!errors.firstName}
              />

              {
                errors.type === "register" && errors.firstName &&
                <div className="mt-2">
                  <p id="firstNameError" className="text-red-700">{errors.firstName}</p>
                </div>
              }
            </div>

            <div>
              <label className="block text-sm font-medium" htmlFor="lastName">* Last name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                placeholder="e.g. Doe"
                className="mt-1 w-full rounded border px-3 py-2"
                value={formData.lastName}
                onChange={handleChange}
                aria-describedby={errors.type === "register" && errors.lastName ? "lastNameError" : undefined}
                aria-invalid={errors.type === "register" && !!errors.lastName}
              />

              {
                errors.type === "register" && errors.lastName &&
                <div className="mt-2">
                  <p id="lastNameError" className="text-red-700">{errors.lastName}</p>
                </div>
              }
            </div>
          </>
        ) : (
          <></>
        )
      }

      <div>
        <label className="block text-sm font-medium" htmlFor="email">* Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="e.g. johnDoe@gmail.com"
          className="mt-1 w-full rounded border px-3 py-2"
          value={formData.email}
          onChange={handleChange}
          aria-describedby={errors.type === "login" && errors.email ? "emailError" : undefined}
          aria-invalid={!!errors.email}
        />

        {
          errors.email &&
          <div className="mt-2">
            <p id="emailError" className="text-red-700">{errors.email}</p>
          </div>
        }
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="password">* Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded border px-3 py-2"
          value={formData.password}
          onChange={handleChange}
          aria-describedby={errors.type === "login" && errors.password ? "passwordError" : undefined}
          aria-invalid={!!errors.password}
        />

        {
          errors.password &&
          <div className="mt-2">
            <p id="passwordError" className="text-red-700">{errors.password}</p>
          </div>
        }
      </div>

      {
        authError && (
          <div
            role="alert"
            aria-live="assertive"
            className="rounded border border-red-300 bg-red-50 p-3 text-red-700"
          >
            {authError}
          </div>
        )
      }

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}