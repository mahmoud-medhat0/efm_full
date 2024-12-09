
import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
const Historysection = () => {
  const { deposits } = usePage().props;
  return (
    <DashboardLayout>
    <h2 style={{ 
      fontSize: '1.4rem', 
      fontWeight: 'bold', 
      color: '#808892', 
      textAlign: 'center' 
    }}>Deposit History</h2>
    <div className="historyContainer" style={{ maxHeight: '540px', overflowY: 'auto', position: 'relative' }}>
      <table className="historyTable">
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th className="historyTh">Amount</th>
            <th>Fee</th>
            <th>Total</th>
            <th>Rejection Cause</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {deposits.length === 0 ? (
                <tr>
                    <td colSpan={4} className="text-center py-4">No Deposit found</td>
                </tr>
            ) : (deposits.map((item, index) => (
            <tr key={item.id} className="historyRow">
              <td>{item.created_at_human}</td>
              <td>{item.tnx}</td>
              <td>{item.amount}</td>
              <td>{item.fee}</td>
              <td>{item.total}</td>
              <td>{item.rejectionCauseName}</td>
              <td>
                <button className={`historyBtn ${item.status.toLowerCase()}`}>
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
