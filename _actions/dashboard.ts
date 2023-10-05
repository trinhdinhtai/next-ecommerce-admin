import { prisma } from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + item.product.price.toNumber();
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};

export const getSalesCount = async (storeId: string) => {
  const salesCount = await prisma.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};

export const getStockCount = async (storeId: string) => {
  const stockCount = await prisma.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};

export const getRecentOrders = async (storeId: string) => {
  const paidOrders = await prisma.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return paidOrders;
};
