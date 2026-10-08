// import { z } from "zod";

// export const RegisterSchema = z.object({
//   firstName: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .min(2, "Please enter your first name.") //must be 2 characters or longer in length
//     .max(50, "Name is too long."), //cannot exceed 50 characters in length

//     //If any of the above conditions are not met, the error message provided is returned
  
//   lastName: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .min(2, "Please enter your last name") //must be 2 characters or longer in length
//     .max(50, "Name is too long."), //cannot exceed 50 characters in length

//     //If any of the above conditions are not met, the error message provided is returned

//   email: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .email("Please enter a valid email address") //verifies the submission field value is provided in an email format
//     .min(3, "Please enter your full email address") //must be 3 characters or longer in length
//     .max(100), //restricts the email length to a maximum of 100 characters

//     //If any of the above conditions are not met, the error message provided is returned

//   password: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .min(6, "Password must be at least 6 characters") //must be 6 characters or longer in length

//     //If any of the above conditions are not met, the error message provided is returned
// });

// export type RegisterFormData = z.infer<typeof RegisterSchema>;
// //z.infer creates the TS type automatically, defining this using your RegisterSchema, keeping them in sync with each other, so it is instead of writing:
// /*
//     type RegisterFormData = {
//         firstName: string;
//         lastName: string;
//         email: string;
//         password: string;
//     };
// */









// export const LoginSchema = z.object({
//   email: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .email("Please enter a valid email address") //verifies the submission field value is provided in an email format
//     .min(3, "Please enter your full email address") //must be 3 characters or longer in length
//     .max(100), //restricts the email length to a maximum of 100 characters
  
//   password: z
//     .string() //ensures submission fields value is a string 
//     .trim() //removes leading / trailing whitespace
//     .min(6, "Password must be at least 6 characters") //must be 6 characters or longer in length
    
// });

// export type LoginFormData = z.infer<typeof LoginSchema>;
// //z.infer creates the TS type automatically, defining this using your LoginSchema, keeping them in sync with each other, so it is instead of writing:
// /*
//     type LoginFormData = {
//         email: string;
//         password: string;
//     };
// */





import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z
    .string() 
    .trim() 
    .min(2, "Please enter your first name.") 
    .max(50, "Name is too long."), 

    //If any of the above conditions are not met, the error message provided is returned
  
  lastName: z
    .string() //ensures submission fields value is a string 
    .trim() //removes leading / trailing whitespace
    .min(2, "Please enter your last name") //must be 2 characters or longer in length
    .max(50, "Name is too long."), //cannot exceed 50 characters in length

    //If any of the above conditions are not met, the error message provided is returned

  email: z
    .string() 
    .trim() 
    .email("Please enter a valid email address") 
    .min(3, "Please enter your full email address")
    .max(100), 

    //If any of the above conditions are not met, the error message provided is returned

  password: z
    .string()  
    .trim() 
    .min(6, "Password must be at least 6 characters")

    //If any of the above conditions are not met, the error message provided is returned
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;









export const LoginSchema = z.object({
  email: z
    .string()  
    .trim() 
    .email("Please enter a valid email address") 
    .min(3, "Please enter your full email address") 
    .max(100), 
  
  password: z
    .string() 
    .trim() 
    .min(6, "Password must be at least 6 characters")
    
});

export type LoginFormData = z.infer<typeof LoginSchema>;