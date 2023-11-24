import { prisma } from "@/lib/prismadb"

export async function getSubscriptionPlanAction(userId: string) {
  const subscriptionPlan = await prisma.userSubscription.findFirst({
    where: {
      userId,
    },
  })

  return subscriptionPlan
}
