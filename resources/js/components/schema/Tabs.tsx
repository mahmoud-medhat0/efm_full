import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  const [categories] = useState({
    "The Top 100": [
      {
        id: 1,
        username: "Modatrade3",
        referrals24: 473.0,
        referrals7: 1817.0,
        referrals30: 11215.0,
      },
      {
        id: 2,
        username: "Engmorad",
        referrals24: 88.0,
        referrals7: 1017.0,
        referrals30: 5215.0,
      },
      {
        id: 3,
        username: "helalnet",
        referrals24: 84.0,
        referrals7: 817.0,
        referrals30: 3215.0,
      },
      {
        id: 4,
        username: "coinpayu",
        referrals24: 60.0,
        referrals7: 117.0,
        referrals30: 1215.0,
      },
      {
        id: 5,
        username: "Abduyq",
        referrals24: 54.0,
        referrals7: 1782.0,
        referrals30: 11215.0,
      },
      {
        id: 6,
        username: "abdomohamed",
        referrals24: 48.0,
        referrals7: 1114.0,
        referrals30: 11215.0,
      },
    ],
    "Current Contests": [
      {
        id: 1,
        username: "Modatrade3",
        referrals24: 473.0,
        referrals7: 3412.0,
        referrals30: 7211.0,
      },
      {
        id: 2,
        username: "Modatrade3",
        referrals24: 473.0,
        referrals7: 417.0,
        referrals30: 4115.0,
      },
    ],
    "Our Winners": [
      {
        id: 1,
        username: "Modatrade3",
        referrals24: 473.0,
        referrals7: 1817.0,
        referrals30: 11215.0,
      },
      {
        id: 2,
        username: "Modatrade3",
        referrals24: 473.0,
        referrals7: 1817.0,
        referrals30: 11215.0,
      },
    ],
  });

  return (
    <div className="w-full px-2 py-20 sm:px-0">
      <Tab.Group>
        <Tab.List className="max-w-xl mb-6 flex space-x-1 rounded-xl bg-background/5 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                  "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                  selected
                    ? "bg-white text-black font-medium shadow"
                    : "text-primary hover:bg-white/[0.12] hover:text-primary/90"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((winners, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-md bg-white p-3",
                "focus:outline-none"
              )}
            >
              <table className="w-full">
                <thead className="border-b border-black font-normal">
                  <tr>
                    <th className="text-left py-3">Position</th>
                    <th className="text-left py-3">Username</th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      Referrals in 24 hours
                    </th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      Referrals in 7 days
                    </th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      Referrals in 30 days
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  {winners.map((winner, idx) => (
                    <tr
                      key={winner.id}
                      className={idx % 2 === 1 ? "bg-white" : "bg-blue-100"}
                    >
                      <td className="py-3 px-2">{winner.id}</td>
                      <td className="py-3 px-2">{winner.username}</td>
                      <td className="py-3 px-2">{winner.referrals24}</td>
                      <td className="py-3 px-2">{winner.referrals7}</td>
                      <td className="py-3 px-2">{winner.referrals30}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
