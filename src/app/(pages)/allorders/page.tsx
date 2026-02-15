import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getUserOrdersAction } from "../profile/_actions/Profile.actions";
import OrdersSection from "../profile/_components/OrdersSection";

export default async function AllOrdersPage() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?._id as string;
    const orders = await getUserOrdersAction(userId);
     return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all border border-gray-200"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-extrabold text-lg truncate">{order.title}</h2>
                        <span className={`text-sm font-bold ${order.status === 'Completed' ? 'text-green-600' : 'text-indigo-600'}`}>
                            {order.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                        Order ID: <span className="font-bold">{order.id}</span>
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                        Date: <span className="font-bold">{new Date(order.date).toLocaleDateString()}</span>
                    </p>
                    <p className="text-gray-600 text-sm">
                        Total: <span className="font-bold">${order.total}</span>
                    </p>
                </div>
            ))}
        </div>
    )
}
