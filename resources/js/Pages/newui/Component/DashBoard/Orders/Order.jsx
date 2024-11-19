import { useState } from 'react';
import DashboardLayout from '../../../Layout/DashboardLayout';
import { usePage } from "@inertiajs/inertia-react";
import './Order.css';
const categories = ["All", "approved", "pending", "canceled"];

const Orders = () => {
  const { orders } = usePage().props;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const filteredOrders = selectedCategory === "All" 
    ? orders 
    : orders.filter(order => order.status === selectedCategory);
  return (
    <DashboardLayout>
       <span className='title-orders'>Orders</span>
      <div className="buttons">
      
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? 'active' : ''}
            style={{fontSize: '1rem'}}
          >
            {category}
          </button>
        ))}
      </div>
    <div className="container" >
     
      <div style={{ maxHeight: '1840px', overflowY: 'auto', position: 'relative' }}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Price</th>
            <th>Target Amount</th>
            <th>Current Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length === 0 ? (
            <tr>
              <td colSpan="5">No orders available</td>
            </tr>
          ) : (
            filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.order_id}</td>
                <td>EGP{order.price}</td>
                <td>{order.target_amount}</td>
                <td>{order.current_amount}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
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
    </DashboardLayout>
  );
}

export default Orders;