import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import moment from "moment";
const WithdrawHistory = () => {
  const { props } = usePage();
  const withdraws = props.withdraws;
  return (
    <DashboardLayout>
    <div>
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-2">Withdraw History :</h3>
          <table className="w-full shadow-md">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3">Withdraw</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {withdraws.map((withdraw) => (
                <tr key={withdraw.id}>
                  <td className="text-left py-3 px-2 text-sm">{moment(withdraw.created_at).format('DD MMM YYYY HH:mm:ss A')}</td>
                  <td className="text-left py-3">{withdraw.amount}</td>
                  <td className="text-left py-3">{withdraw.total}</td>
                  <td className={`text-left py-3`}>
                    <span className={`px-2 py-1 rounded ${withdraw.status=='success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {withdraw.status}
                    </span>
                  </td>
                </tr>
              ))}
              {withdraws.length === 0 && (
                <tr>
                  <td className="pt-3 pb-2 px-2 text-sm">You don't have any withdraw.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default WithdrawHistory;
