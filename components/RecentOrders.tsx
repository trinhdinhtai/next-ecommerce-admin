import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { OrderColumn } from "@/types/columns";
import { getAvatarFallback } from "@/helpers/utils";

interface RecentOrdersProps {
  recentOrders: OrderColumn[];
}

const RecentOrders = ({ recentOrders }: RecentOrdersProps) => {
  return (
    <div className="space-y-8">
      {recentOrders.map((order) => (
        <div className="flex items-center" key={order.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt={order?.customerName}
            />
            <AvatarFallback>
              {getAvatarFallback(order?.customerName)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {order?.customerName}
            </p>
            <p className="text-sm text-muted-foreground">{order?.phone}</p>
          </div>
          <div className="ml-auto font-medium">+{order.totalPrice}</div>
        </div>
      ))}
    </div>
  );
};

export default RecentOrders;
