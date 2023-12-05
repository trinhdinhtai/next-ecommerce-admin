"use server"

import { auth, clerkClient } from "@clerk/nextjs"
import { UpdateUserParams } from "@clerk/types"

import { AccountFormValues } from "@/lib/validations/account"

export async function updateUserAction({
  firstName,
  lastName,
}: AccountFormValues) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const params: UpdateUserParams = {
    firstName,
    lastName,
  }

  await clerkClient.users.updateUser(userId, params)
}
