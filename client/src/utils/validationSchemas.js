import * as yup from "yup";

// -----------Helpers----------------
const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};

const loginShape = {
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
};

// -----------Schemas----------------
export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(255)
    .required("Name is required"),
  ...loginShape,
  password_confirmation: yup
    .string()
    .required("Please re-type your password")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

export const taskSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters")
    .required("Description is required"),
});

export const loginSchema = yup.object().shape(loginShape);
