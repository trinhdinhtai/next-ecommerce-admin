import { isClerkAPIResponseError } from "@clerk/nextjs"
import { toast } from "sonner"
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

export function catchClerkError(err: unknown) {
  const unknownErr = "Something went wrong, please try again later."

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (isClerkAPIResponseError(err)) {
    return toast.error(err.errors[0]?.longMessage ?? unknownErr)
  } else {
    return toast.error(unknownErr)
  }
}
