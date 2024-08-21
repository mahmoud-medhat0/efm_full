import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
const LoginHistory = () => {
  const { props } = usePage();
  const loginAttempts = props.loginAttempts;
  return (
    <DashboardLayout>
    <div>
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-2">Login History :</h3>
          <table className="w-full shadow-md">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3">Country</th>
                <th className="text-left py-3">IP</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {loginAttempts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No login attempts found</td>
                </tr>
              ) : (
                loginAttempts.map((attempt, index) => (
                  <tr key={index}>
                    <td className="text-left py-4 px-2">{new Date(attempt.created_at).toLocaleString()}</td>
                    <td className="text-left py-4">{attempt.country || 'Unknown'}</td>
                    <td className="text-left py-4">{attempt.ip_address}</td>
                    <td className="text-left py-4">
                      <span className={`px-2 py-1 rounded ${attempt.successful ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {attempt.successful ? 'Success' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default LoginHistory;
