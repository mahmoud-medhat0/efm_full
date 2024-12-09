import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
import { useState } from 'react';


const Historysection = () => {
  const { orders } = usePage().props;
  const [filter, setFilter] = useState('All');

  const filteredOrders = orders.filter(order =>
    filter === 'All' || order.status === filter
  );

  return (
    <DashboardLayout>
      <div className="OHI-container">
        {/* عنوان الصفحة */}
        <h2 className="OHI-title">Orders History</h2>

        {/* أزرار الفلترة */}
        <div className="OHI-filterButtons">
          {['All', 'Pending', 'Approved', 'Canceled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`OHI-filterButton ${filter === status ? 'OHI-activeButton' : ''}`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="OHI-tableContainer">
          <table className="OHI-table">
            <thead>
              <tr>
                <th className="OHI-th">Date</th>
                <th className="OHI-th">Service</th>
                <th className="OHI-th">Price</th>
                <th className="OHI-th">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="OHI-noOrders">No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((item) => (
                  <tr key={item.id}>
                    <td className="OHI-td">{item.created_at_human}</td>
                    <td className="OHI-td">{item.service_name}</td>
                    <td className="OHI-td">{item.price}</td>
                    <td className="OHI-td">
                      <button
                        className={`OHI-statusButton ${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </button>
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
};

export default Historysection;
