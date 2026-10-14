"use client";

import { LoginSchema, LoginFormData, RegisterSchema, RegisterFormData } from "@/lib/validation";
import { useState } from "react";
import { loginUser, registerUser } from "@/lib/api";
import { useRouter } from "next/navigation";

/*
DEFINING THE TYPE OF YOUR FORM'S STATE
When you create your Zod lib/validation.ts schema, inference is used to automatically generate types for the register and login forms. 
You can then import the generated type alias', RegisterFormData & LoginFormData in to the AuthForm, at this point they look like this:

---TYPE ALIAS---
type RegisterFormData = {
  firstName: string; //PROPERTY WITH STRING TYPE
  lastName: string;
  email: string;
  password: string;
}

---TYPE ALIAS---
type LoginFormData = {
  email: string;
  password: string;
}

Each alias is then combined with an object to create a new intersection type alias:
type RegisterFormState = RegisterFormData & { type: "register" };
type LoginFormState = LoginFormData & { type: "login" };

{ type: "register" } and { type: "login" } are both objects with a single property of type 'string literal'

By adding the intersection type operator & you are combining the RegisterFormData type alias with the object, which now looks like this:
---INTERSECTION TYPE ALIAS---
type RegisterFormData = {
  type: "register"
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

By adding the intersection type operator & you are combining the LoginFormData type alias with the object, which now looks like this:
---INTERSECTION TYPE ALIAS---
type LoginFormData = {
  type: "login"
  email: string;
  password: string;
}

AuthFormData is created, the value can either be RegisterFormState or LoginFormState meaning this is a union type. However, because both RegisterFormState and LoginFormState share a type property with differing values, the type property is known an a discriminant making AuthFormData not just a union but more specifically a discriminated union type: 
---DISCRIMINATED UNION---
type AuthFormData = RegisterFormState | LoginFormState;


Now when you define the default inital state of the form data it will use the discriminated union type AuthFormData but you will be able to use the type property to specify which form type is currently used, this is known as type narrowing.
//NARROWING
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



DEFINING THE TYPE OF YOUR FORM'S ERROR STATE
When the RegisterFormState type was defined it looked like this: 
type RegisterFormState = RegisterFormData & { type: "register" };

So why do we have the additional parts added around RegisterFormData when creating the type for RegisterFormErrors?
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>> & { type: "register" };

This is needed because the original RegisterFormState created an intersection type alias where all of the RegisterFormData properties were required but for the error state we need them to be optional. The additional code surrounding RegisterFormData is what makes the properties of the RegisterFormData optional, the result looks like this:
---INTERSECTION TYPE ALIAS---
type RegisterFormData = {
  type: "register"
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

Steps to make the RegisterFormData properties optional:

---STEP 1---
KEYOF operator extracts the property names of an alias, producing a union of string literal types:
  e.g. RegisterFormData type would be "firstName" | "lastName" | "email" | "password" 
  e.g. LoginFormData type would be "email" | "password"

---STEP 2---
RECORD is a built-in TS utility type with this syntax:
    type Record<K, V> = {
    [P in K]: V;
    }

it creates an obj of key value pairs so RegisterFormData alias would be [firstName/Property in Key]: string/value. 
Now it looks like this:
{
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

---STEP 3---
PARTIAL another built in utility type with this syntax:
type Partial<T> = {
    [P in keyof T]?: T[P];
}

adding partial is equivalent to adding ? to each property name, making the property optional. 
Now it looks like this:
{
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

Each alias is then combined with an object to create a new intersection type alias:
type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>> & { type: "register" };
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>> & { type: "login" };

{ type: "register" } and { type: "login" } are both objects with a single property of type 'string literal'

By adding the intersection type operator & you are combining the RegisterFormData type alias with the object, which now looks like this:
---INTERSECTION TYPE ALIAS---
type RegisterFormData = {
  type: "register"
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

By adding the intersection type operator & you are combining the LoginFormData type alias with the object, which now looks like this:
---INTERSECTION TYPE ALIAS---
type LoginFormData = {
  type: "login"
  email?: string;
  password?: string;
}

AuthFormErrors is created, the value can either be RegisterFormErrors or LoginFormErrors meaning this is a union type. However, because both RegisterFormErrors and LoginFormErrors share a type property with differing values, the type property is known as a discriminant making AuthFormErrors not just a union but more specifically a discriminated union type: 
---DISCRIMINATED UNION---
type AuthFormErrors = RegisterFormErrors | LoginFormErrors;

By making the properties of RegisterFormErrors and LoginFormErrors optional it means that if only 1 of the propeties returned an error when validated by zod, the error's state will only consist of the property which errored and not unnecessarily include the others which did not have errors. This approach means the validation.ts schema can be updated and the type alias for the forms will automatically update to match it, keeping everything in sync! 
*/



type RegisterFormState = RegisterFormData & { type: "register" };
type LoginFormState = LoginFormData & { type: "login" };
type AuthFormData = RegisterFormState | LoginFormState; //AuthFormData is a discriminated union type

type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>> & { type: "register" };
type LoginFormErrors = Partial<Record<keyof LoginFormData, string>> & { type: "login" };
type AuthFormErrors = RegisterFormErrors | LoginFormErrors; //AuthFormErrors is a discriminated union

type AuthFormProps = {
  type: "login" | "register"; //string literal union
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

    // This line checks the form type and passes the data collected from the form fields to the matching zod type schema for validation checks 
    const validation =
      type === "register"
        ? RegisterSchema.safeParse(formData)
        : LoginSchema.safeParse(formData);

        console.log('validation: ', validation);

    if (!validation.success) {
      //validation stores the response from the zod validation. The response will always have a success property, if true it passed, if false it has failed

      if (formData.type === "register") {

        //fieldErrors is initialised as RegisterFormErrors which has only one required property 'type'.
        const fieldErrors: RegisterFormErrors = {
          type: "register"
        };

        //---transforming the data---
        //this block maps through each error returned by zod, which may look something like this:
        // The path tells you which field the error belonged to and the message is the error text you can display to provide user feedback.
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
        //and converts it in to a format which is easier to access from the UI when validating the fields or providing user feedback. Post transformation it looks like this:
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
        //If if passes validation, it will return something like this:
        // {
        //   success:true,
        //   data: { 
        //        email: "tom@gmail.com",
        //        password: "kns68^$p"
        //   }
        // }
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
        <label className="block text-sm font-medium" htmlFor="password">Password</label>
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

      <button
        type="submit"
        className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}