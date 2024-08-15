import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z.string().min(1, { message: "Password is required" }),
  remember: z.boolean().default(false),
});

export type LoginForm = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(10, { message: "First name must not be greater than 10 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(10, { message: "Last name must not be greater than 10 characters" }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Please enter a valid email address.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type RegisterForm = z.infer<typeof RegisterSchema>;

export const EmailVerificationSchema = z.object({
  token: z.string().min(1, { message: "Link is invalid or expired." }),
});

export type EmailVerificationToken = z.infer<typeof EmailVerificationSchema>;

export const UserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  permissions: z.object({
    emailVerified: z.boolean(),
    accountStatus: z.string(),
    registeredSeller: z.boolean(),
    verifiedSeller: z.boolean(),
  }),
});

export type GetUserSchema = z.infer<typeof UserSchema>;
