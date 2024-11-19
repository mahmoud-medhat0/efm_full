import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
import { useState } from 'react';

const Historysection = () => {
  const { orders } = usePage().props;
  const [filter, setFilter] = useState('All');

  const filteredOrders = orders.filter(order =>
    filter === 'All' || order.status === filter
  );

  const styles = {
    container: {
      padding: '20px',
      margin: 'auto',
    },
    title: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#808892',
      textAlign: 'center',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '20px',
      },
    },
    filterButtons: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '20px',
      gap: '10px',
    },
    filterButton: {
      padding: '8px 16px',
      fontSize: '14px',
      fontWeight: 'bold',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f7f7f7',
      color: '#333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    activeButton: {
      backgroundColor: '#ddb27d',
      color: 'white',
      borderColor: '#ddb27d',
    },
    tableContainer: {
      width: '100%',
      overflowX: 'auto',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      backgroundColor: '#fff',
      borderRadius: '5px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    th: {
      padding: '12px 20px',
      textAlign: 'left',
      backgroundColor: '#f5f5f5',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    td: {
      padding: '12px 20px',
      textAlign: 'left',
      borderBottom: '1px solid #ddd',
      color: '#555',
      fontSize: '16px',
    },
    noOrders: {
      textAlign: 'center',
      padding: '20px',
      fontSize: '14px',
      color: '#999',
    },
    statusButton: {
      padding: '5px 10px',
      borderRadius: '5px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'default',
    },
    approved: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    pending: {
      backgroundColor: '#FFC107',
      color: 'white',
    },
    canceled: {
      backgroundColor: '#F44336',
      color: 'white',
    },
  };

  return (
    <DashboardLayout>
      <div style={styles.container}>
        {/* عنوان الصفحة */}
        <h2 style={styles.title}>Orders History</h2>

        {/* أزرار الفلترة */}
        <div style={styles.filterButtons}>
          {['All', 'Pending', 'Approved', 'Canceled'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                ...styles.filterButton,
                ...(filter === status ? styles.activeButton : {}),
              }}
            >
              {status}
            </button>
          ))}
        </div>

        <div style={{ ...styles.tableContainer, maxHeight: '460px', overflowY: 'auto', position: 'relative' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Service</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} style={styles.noOrders}>No orders found</td>
                </tr>
              ) : (
                filteredOrders.map((item) => (
                  <tr key={item.id}>
                    <td style={styles.td}>{item.created_at_human}</td>
                    <td style={styles.td}>{item.service_name}</td>
                    <td style={styles.td}>{item.price}</td>
                    <td style={styles.td}>
                      <button
                        style={{
                          ...styles.statusButton,
                          ...(styles[item.status.toLowerCase()] || {}),
                        }}
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
