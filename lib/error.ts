import * as z from "zod"

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => issue.message)
    return errors.join("\n")
  }

  if (err instanceof Error) {
    return err.message
  }

  return "Something went wrong, please try again later."
}
