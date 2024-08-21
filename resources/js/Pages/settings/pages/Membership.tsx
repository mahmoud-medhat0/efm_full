import MembershipTabs from "../../../components/dashboard/tabs/MembershipTabs";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import { memberships } from "../../../data/memberships";

const MembershipPage = () => {
  const data = memberships;

  return (
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          <h3 className="text-lg mb-2">Upgrade Account</h3>
          <table className="w-full shadow-md">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-primary text-left py-3 px-2 text-base">
                  Comparison Destination
                </th>
                <th className="text-left py-3">Bronze</th>
                <th className="text-left py-3">Silver</th>
                <th className="text-left py-3">Gold</th>
                <th className="text-left py-3">Platinum</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {data.map(({ title, bronze, silver, gold, platinum }, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 1 ? "bg-white" : "bg-blue-100"}
                >
                  <td className="pt-3 pb-2 px-2 text-base text-primary">
                    {title}
                  </td>
                  <td className="pt-3 pb-2 text-sm">{bronze}</td>
                  <td className="pt-3 pb-2 text-sm">{silver}</td>
                  <td className="pt-3 pb-2 text-sm">{gold}</td>
                  <td className="pt-3 pb-2 text-sm">{platinum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <MembershipTabs />
      </div>
    </div>
  );
};

export default MembershipPage;
