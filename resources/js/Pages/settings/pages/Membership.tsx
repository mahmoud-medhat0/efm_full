import MembershipTabs from "../../../components/dashboard/tabs/MembershipTabs";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import RootLayout from "../Layout";
import { usePage } from "@inertiajs/inertia-react";
const MembershipPage = () => {
  const page = usePage();
  const memberships = page.props.memberships;
  return (
    <RootLayout>
      <div className="w-full h-auto mt-20">
        <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="mb-8">
          {/* <h3 className="text-lg mb-2">Upgrade Account</h3>
          <table className="w-full shadow-md">
            <thead className="border-b border-black font-normal">
              <tr>
                <th className="text-primary text-left py-3 px-2 text-base">
                  Comparison Destination
                </th>
                <th className="text-left py-3">Free</th>
                {memberships.map(({ name, price }, idx) => (      
                  <th className="text-left py-3">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
              {memberships.map(({ name, price,duration }, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 1 ? "bg-white" : "bg-blue-100"}
                >
                  <td className="pt-3 pb-2 px-2 text-base text-primary">
                    Duration
                  </td>
                  <td className="pt-3 pb-2 text-sm">{duration}</td>
                  <td className="pt-3 pb-2 text-sm">{price}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
        <MembershipTabs />
      </div>
      </div>
    </RootLayout>
  );
};

export default MembershipPage;
