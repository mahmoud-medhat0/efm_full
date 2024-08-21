import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";

const OrderHistory = () => {
  return (
    <div>
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-2">Orders History :</h3>
          <table className="w-full shadow-md">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-left py-3 px-2">Date</th>
                <th className="text-left py-3">Product</th>
                <th className="text-left py-3">Price</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              <tr>
                <td className="pt-3 pb-2 px-2 text-sm">
                  You don't have any order.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
