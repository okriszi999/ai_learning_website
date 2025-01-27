import { z } from "zod";

export const accountSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
});

export const personalInfoSchema = z.object({
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  birthDate: z.string().min(1, "Birth date is required"),
});

export const topicsSchema = z.object({
  topics: z.array(z.string()).min(3, "Select at least 3 topics"),
});

export const signUpSchema = accountSchema
  .merge(personalInfoSchema)
  .merge(topicsSchema);

export type SignUpFormData = z.infer<typeof signUpSchema>;
