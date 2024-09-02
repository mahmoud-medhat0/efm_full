import InfoAlert from "../../../../components/dashboard/alerts/InfoAlert";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import Select from "../../../../components/schema/Select";
import DashboardLayout from "../../../../Pages/settings/Layout";
const AdvertiserPanelPage = () => {
  return (
    <DashboardLayout>
    <div className="w-full h-auto mt-20">
      <WelcomeTab />

      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-5">Manage</h3>
          <Select index={0} />
        </div>
        <InfoAlert msg="Click here to add a new advertisement" />
        <div className="">
          <h3 className="text-lg mb-3">Paid To Click Ads</h3>
          <table className="w-full">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-primary text-left py-3"> Ad</th>
                <th className="text-primary text-left py-3"> Credits</th>
                <th className="text-primary text-left py-3">
                  Clicks <span className="text-black">/</span> Outside
                </th>
                <th className="text-primary text-left py-3"> Clicks today</th>
                <th className="text-left py-3"> Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              <tr>
                <td colSpan={4} className="pt-3 text-sm">
                  Records not found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default AdvertiserPanelPage;
