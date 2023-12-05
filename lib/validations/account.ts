import * as z from "zod"

export const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  dob: z.date().optional(),
  language: z.string({
    required_error: "Please select a language.",
  }),
})

export type AccountFormValues = z.infer<typeof accountFormSchema>
