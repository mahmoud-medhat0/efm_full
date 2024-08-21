import DashboardTabs from "../../components/dashboard/tabs/DashboardTabs";
import WelcomeTab from "../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "./Layout";
const DashboardPage = () => {
  return (
    <DashboardLayout>
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
        <DashboardTabs />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
