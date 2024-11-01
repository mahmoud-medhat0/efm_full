import { useState } from "react";
import { Tab } from "@headlessui/react";
import { translate } from "../../utils/functions";
import { usePage } from "@inertiajs/inertia-react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({referralsLast24Hours, referralsLast7Days, referralsLast30Days, referralsLast24HoursTop100, referralsLast7DaysTop100, referralsLast30DaysTop100, referralsTop100}: {referralsLast24Hours: any, referralsLast7Days: any, referralsLast30Days: any, referralsLast24HoursTop100: any, referralsLast7DaysTop100: any, referralsLast30DaysTop100: any, referralsTop100: any}) {
  const { lang: locale } = usePage().props;
  const [categories] = useState({
    "Last 24 Hours": referralsLast24Hours.map((referral, index) => {
      return {
        id: index + 1,
        username: referral.name,
      };
    }),
    "Last 7 Days": referralsLast7Days.map((referral, index) => {
      return {
        id: index + 1,
        username: referral.name,
      };
    }),
    "Last 30 Days": referralsLast30Days.map((referral, index) => {
      return {
        id: index + 1,
        username: referral.name,
      };
    }),
    "The Top 100": referralsTop100.map((referral, index) => {
      return {
        id: index + 1,
        username: referral.name,
      };
    }),
  });

  return (
    <div className="w-full px-2 py-12 sm:px-0 text-center">
      <Tab.Group>
        <div className="flex items-center justify-center">
          <Tab.List className="mb-6 flex space-x-1 rounded-xl bg-background/5 p-1 max-sm:flex-col text-center" style={{width: "100%"}}>
            {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                  selected
                    ? "bg-white/100 text-black font-medium shadow"
                    : "text-primary hover:bg-white/[0.12] hover:text-primary/90"
                )
              }
            >
              {translate("home."+category)}
            </Tab>
            ))}
          </Tab.List>
        </div>
        <Tab.Panels className="mt-2 text-center">
          {Object.values(categories).map((winners, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-md bg-white p-3 text-center",
                "focus:outline-none text-center"
              )}
            >
              <table className="w-full border-collapse text-center" dir={locale === "ar" ? "rtl" : "ltr"}>
                <thead className="border-b-2 border-gray-300">
                  <tr>
                    <th className={`text-center py-3 px-2 max-sm:text-xs font-semibold text-gray-700`}>{translate("home.position")}</th>
                    <th className={`text-center py-3 px-2 max-sm:text-xs font-semibold text-gray-700`}>{translate("home.username")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {winners.map((winner, idx) => {
                    return (
                      <tr key={winner.id}
                        className={idx % 2 === 1 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-3 px-2 max-sm:text-xs text-gray-600">{winner.id ? winner.id : idx + 1}</td>
                        <td className="py-3 px-2 max-sm:text-xs text-gray-600">{winner.username ? winner.username : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
