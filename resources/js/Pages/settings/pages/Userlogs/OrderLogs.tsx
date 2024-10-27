import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
const OrderHistory = () => {
    const { props } = usePage();
    const orders = props.orders;
    return (
        <DashboardLayout>
            <div>
                <WelcomeTab />
                <div className="w-full px-2 py-12 sm:px-0">
                    <div className="mb-8">
                        <h3 className="text-lg mb-2">Orders History :</h3>
                        <table className="w-full shadow-md">
                            <thead className="border-b border-black font-normal">
                                <tr>
                                    <th className="text-left py-3 px-2">
                                        Date
                                    </th>
                                    <th className="text-left py-3">Service</th>
                                    <th className="text-left py-3">Price</th>
                                    <th className="text-left py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-100">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="text-center py-4"
                                        >
                                            No orders found
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="py-3 px-2">
                                                {order.created_at}
                                            </td>
                                            <td className="py-3">
                                                {order.service_name}
                                            </td>
                                            <td className="py-3">
                                                {order.price}
                                            </td>
                                            <td
                                                className={`pt-3 pb-2 px-2 text-sm text-left`}
                                            >
                                                <span
                                                    className={`px-2 py-1 rounded ${
                                                        order.status ==
                                                        "success"
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-yellow-100 text-yellow-800"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default OrderHistory;
