import { useState } from "react";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
const categories = ["All", "approved", "pending", "canceled"];

const OrdersPage = () => {
  const { orders } = usePage().props;
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredOrders = selectedCategory === "All" 
    ? orders 
    : orders.filter(order => order.status === selectedCategory);

  return (
    <DashboardLayout>
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <h3 className="text-2xl mb-4">Orders</h3>
        <div className="flex space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-md ${selectedCategory === category
                ? "bg-primary text-white"
                : "bg-gray-200 text-primary"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-primary text-white text-left text-sm font-medium rounded-tl-xl">ID</th>
                <th className="px-6 py-4 bg-primary text-white text-left text-sm font-medium">Price</th>
                <th className="px-6 py-4 bg-primary text-white text-left text-sm font-medium">Status</th>
                <th className="px-6 py-4 bg-primary text-white text-left text-sm font-medium">Target Amount</th>
                <th className="px-6 py-4 bg-primary text-white text-left text-sm font-medium rounded-tr-xl">Current Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No orders available for this category.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-100 cursor-auto">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.order_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">EGP{order.price}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      order.status === 'completed' ? 'text-green-500' :
                      order.status === 'approved' ? 'text-green-500' :
                      order.status === 'pending' ? 'text-yellow-500' :
                      order.status === 'in_progress' ? 'text-blue-500' :
                      order.status === 'canceled' ? 'text-red-500' : 'text-primary'
                    }`}><p className={`text-sm font-medium ${
                      order.status === 'completed' ? 'text-green-500' :
                      order.status === 'approved' ? 'text-green-500' :
                      order.status === 'pending' ? 'text-yellow-500' :
                      order.status === 'in_progress' ? 'text-blue-500' :
                      order.status === 'canceled' ? 'text-red-500' : 'text-primary'
                    }`}>{order.status}</p></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.target_amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">{order.current_amount}</td>
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

export default OrdersPage;