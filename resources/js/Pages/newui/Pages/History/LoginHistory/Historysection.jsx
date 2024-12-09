
import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
const Historysection = () => {
  const { props } = usePage();
  const loginAttempts = props.loginAttempts;
  // const StyledContainer = styled.div`
  // @media (max-width: 768px) {
  // .${historystyles.historyTitles}{
  // width:400px;
  // }
  
  
  // }`
  return (
    <DashboardLayout>
            <h2 style={{ 
      fontSize: '1.4rem', 
      fontWeight: 'bold', 
      color: '#808892', 
      textAlign: 'center' 
    }}>Orders History</h2>

    <div className="historyContainer" style={{ maxHeight: '540px', overflowY: 'auto', position: 'relative' }}>
      <table className="historyTable">
        <thead>
          <tr style={{ position: 'relative', top: 0, backgroundColor: 'white', zIndex: 10 }}>
            <th>Date</th>
            <th className="historyTh">Country</th>
            <th>IP</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            {loginAttempts.length === 0 ? (
                <tr>
                    <td colSpan={4} style={{ textAlign: 'center' }} className="text-center py-4">No login attempts found</td>
                </tr>
            ) : (loginAttempts.map((item, index) => (
            <tr key={item.id} className="historyRow">
              <td>{item.created_at_human}</td>
              <td>{item.country}</td>
              <td>{item.ip_address}</td>
              <td>
                <button className={`historyBtn ${item.successful ? 'approved' : 'declined'}`}>
                  {item.successful ? 'Success' : 'Failed'}
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
