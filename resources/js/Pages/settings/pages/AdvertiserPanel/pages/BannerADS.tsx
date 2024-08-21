import InfoAlert from "../../../../../components/dashboard/alerts/InfoAlert";
import WelcomeTab from "../../../../../components/dashboard/welcome/WelcomeTab";
import Select from "../../../../../components/schema/Select";

const BannerADSPage = () => {
  return (
    <div className="w-full h-auto mt-20">
      <WelcomeTab />

      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-5">Manage</h3>
          <Select index={3} />
        </div>
        <InfoAlert msg="Click here to add a new advertisement" />
        <div className="">
          <h3 className="text-lg mb-3">Banner Ads</h3>
          <table className="w-full">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-primary text-left py-3"> Ad</th>
                <th className="text-primary text-left py-3"> Credits</th>
                <th className="text-primary text-left py-3">
                  Views <span className="text-black">/</span> Clicks
                </th>
                <th className="text-primary text-left py-3">Action</th>
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
  );
};

export default BannerADSPage;
