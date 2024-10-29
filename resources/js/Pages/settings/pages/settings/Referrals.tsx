import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
const Referrals = () => {
  const { referrals, parent } = usePage().props;
  console.log(referrals);
  const treeData = {
    parent: {
      name: parent?.name ?? '',
      id: parent?.id ?? '',
    },
    children: referrals,
  };
  const renderInvites = (invite) => (
    <div key={invite.id} style={{ marginLeft: '20px' }}>
      <p>{invite.name}</p>
      {invite.children && invite.children.map(child => renderInvites(child))}
    </div>
  );
  
  

  const styles = {
    referralTree: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    parent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '10px', // إضافة حشوة داخل الصندوق
      border: '6px solid #ccc', // إضافة حدود للصندوق
      borderRadius: '5px', // إضافة زوايا دائرية للصندوق
      backgroundColor: '#f9f9f9', 
    },
    circle: {
      backgroundColor: '#be9e88',
      color: 'white',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '10px',
    },
    label: {
      backgroundColor: '#2d3a4a',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      textAlign: 'center',
      fontSize: '18px', // Increase font size
      fontWeight: 'bold', // Ensure bold font weight
    },
    children: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      gap: '15px',
      position: 'relative',
    },
    child: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      marginTop: '20px',
      // إزالة الأنماط المتعلقة بالصندوق
      // padding: '10px',
      // border: '1px solid #ccc',
      // borderRadius: '5px',
      // backgroundColor: '#f9f9f9',
    },
    arrow: {
      content: '""',
      position: 'absolute',
      top: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '10px solid #2d3a4a', // تغيير لون السهم إلى #2d3a4a
    },
    childrenContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      gap: '15px',
      position: 'relative',
      padding: '20px',
      border: '6px solid #ccc', // زيادة سمك الحدود إلى 3px
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      overflowX: 'auto',
      overflowY: 'auto',
      maxHeight: '300px',
      maxWidth: '100%',
    },
  };
  return (
    <DashboardLayout>
      <div className="w-full h-auto mt-20">
        <WelcomeTab />
      <div style={styles.referralTree}>
        {parent && (
          <>
            <h3>Parent</h3>
            <div style={styles.parent}>
          <div style={styles.circle}>{treeData.parent.id}</div>
          <div style={styles.label}><strong>Parent ({treeData.parent.name})</strong></div>
            </div>
          </>
        )}
        <div className="w-full mt-10" style={styles.referralTree}>
        <h3>Referral Tree</h3>
        <div style={styles.childrenContainer}> {/* استخدام childrenContainer هنا */}
          {treeData.children.map((child, index) => (
            <div style={styles.child} key={index}>
              <div style={styles.arrow}></div>
              <div style={styles.circle}>{child.id}</div>
              <div style={styles.label}>
                {child.name} <br />
                {/* Invest: {child.invest}, ROI Profit: {child.profit} */}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
}

export default Referrals;
