import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { usePage } from "@inertiajs/inertia-react";
import moment from "moment";

const TransactionHistory = () => {
  const { props } = usePage();
  const transactions = props.transactions;
  return (
    <DashboardLayout>
      <div>
        <WelcomeTab />
        <div className="w-full px-2 py-12 sm:px-0">
          <div className="mb-8">
            <h3 className="text-lg mb-2">Transaction History :</h3>
            <table className="w-full shadow-md">
              <thead className="border-b border-black font-normal">
                <tr>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3">Tnx</th>
                  <th className="text-left py-3">Type</th>
                  <th className="text-left py-3">Amount</th>
                  <th className="text-left py-3">Fees</th>
                  <th className="text-left py-3">Final Amount</th>
                  <th className="text-left py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-100">
                {transactions.map((transaction) => (
                  <tr>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {moment(transaction.created_at).format("DD MMM YYYY HH:mm:ss A")}
                    </td>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {transaction.tnx}
                    </td>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {transaction.type}
                    </td>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {transaction.amount}
                    </td>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {transaction.fee}
                    </td>
                    <td className="pt-3 pb-2 px-2 text-sm">
                      {transaction.total}
                    </td>
                    <td className={`pt-3 pb-2 px-2 text-sm text-left`}>
                    <span className={`px-2 py-1 rounded ${transaction.status=='success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {transactions.length === 0 && (
                  <tr>
                    <td className="pt-3 pb-2 px-2 text-sm">
                    You don't have any transaction.
                  </td>
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

export default TransactionHistory;
