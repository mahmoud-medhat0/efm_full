import historystyles from "../Historysection.module.css";
import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
const Historysection = () => {
  const { transactions } = usePage().props;
  return (
    <DashboardLayout>
      <h2 style={{ 
      fontSize: '1.4rem', 
      fontWeight: 'bold', 
      color: '#808892', 
      textAlign: 'center' 
    }}>Transaction History</h2>

    <div className={historystyles.historyContainer}style={{ maxHeight: '540px', overflowY: 'auto', position: 'relative' }}>
      <table className={historystyles.historyTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th className={historystyles.historyTh}>Amount</th>
            <th>Fee</th>
            <th>Total</th>
            <th>Rejection Cause</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {transactions.length === 0 ? (
                <tr>
                    <td colSpan={4} className="text-center py-4">No Transaction found</td>
                </tr>
            ) : (transactions.map((item, index) => (
            <tr key={item.id} className={historystyles.historyRow}>
              <td>{item.created_at_human}</td>
              <td>{item.tnx}</td>
              <td>{item.amount}</td>
              <td>{item.fee}</td>
              <td>{item.total}</td>
              <td>{item.rejectionCause ? item.rejectionCause.name : 'N/A'}</td>
              <td>
                <button className={`${historystyles.historyBtn} ${historystyles[item.status.toLowerCase() ? item.status.toLowerCase() : 'pending']}`}>
                  {item.status}
                </button>
              </td>
            </tr>
          )))}
        </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default Historysection;
