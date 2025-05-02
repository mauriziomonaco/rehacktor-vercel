import z from "zod";

const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/;
const passwordError = "La password deve contenere almeno un carattere maiuscolo, uno minuscolo e un numero.";

export const FormSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  username: z.string().min(3),
  password: z.string().min(8).regex(passwordRegex, passwordError),
});

export const ConfirmSchema = FormSchema.refine((data) => data);

export const FormSchemaLogin = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const ConfirmSchemaLogin = FormSchemaLogin.refine((data) => data);

export function getFieldError(schema, property, value) {
  const { error } = schema.shape[property].safeParse(value);
  return error
    ? error.issues.map((issue) => issue.message).join(", ")
    : undefined;
}

export const getError = (error) =>
  error.issues.reduce((all, issue) => {
    const path = issue.path.join("");
    const message = all[path] ? all[path] + ", " : "";
    all[path] = message + issue.message;
    return all;
  }, {});
