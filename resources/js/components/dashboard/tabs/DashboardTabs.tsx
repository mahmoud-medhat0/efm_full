import { Tab } from "@headlessui/react";
import { ClockIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/inertia-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import InfoAlert from "../alerts/InfoAlert";
import InfoWarning from "../alerts/WarningAlert";
import { usePage } from "@inertiajs/inertia-react";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardTabs() {
  const data = [
    { name: "26/2", uv: 300, pv: 100 },
    { name: "27/2", uv: 460, pv: 400 },
    { name: "28/2", uv: 200, pv: 730 },
    { name: "29/2", uv: 510, pv: 400 },
    { name: "1/3", uv: 760, pv: 400 },
  ];
  const { props } = usePage();
  const client = props.auth.client;
  const loginAttempts = props.loginFailures;
  // const renderLineChart = (
  //   <div className="flex flex-col justify-center items-center">
  //     <h3 className="w-[250px] cursor-pointer text-center mb-3 bg-hover border-primary border-[1px] p-1 rounded-md text-white">
  //       Your advertisement clicks
  //     </h3>
  //     <AreaChart
  //       width={730}
  //       height={250}
  //       data={data}
  //       margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
  //     >
  //       <defs>
  //         <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
  //           <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
  //           <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
  //         </linearGradient>
  //         <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
  //           <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
  //           <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
  //         </linearGradient>
  //       </defs>
  //       <XAxis dataKey="name" />
  //       <YAxis />
  //       <CartesianGrid strokeDasharray="3 3" />
  //       <Tooltip />
  //       <Area
  //         type="monotone"
  //         dataKey="uv"
  //         stroke="#8884d8"
  //         fillOpacity={1}
  //         fill="url(#colorUv)"
  //       />
  //       <Area
  //         type="monotone"
  //         dataKey="pv"
  //         stroke="#82ca9d"
  //         fillOpacity={1}
  //         fill="url(#colorPv)"
  //       />
  //     </AreaChart>
  //   </div>
  // );

  return (
    <div className="w-full px-2 py-12 sm:px-0">
      <Tab.Group>
        <Tab.List className="w-full mb-6 flex space-x-1 rounded-xl bg-primary p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                selected
                  ? "bg-white text-primary font-medium shadow"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              )
            }
          >
            General Stats
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                selected
                  ? "bg-white text-primary font-medium shadow"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              )
            }
          >
            Advertiser Stats
          </Tab>
          {/* <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                selected
                  ? "bg-white text-primary font-medium shadow"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              )
            }
          >
            Charts
          </Tab> */}
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150",
                selected
                  ? "bg-white text-primary font-medium shadow"
                  : "bg-white text-primary border-primary hover:bg-primary hover:text-white"
              )
            }
          >
            Login Failures
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 rounded-md">
          <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div className="py-3 px-3 text-black">
              <div className="mb-4">
                <h3 className="text-black text-2xl mb-3">Earning Balance Stats</h3>
                <div className="flex flex-row justify-between border-b-[1px]">
                  <div className="w-full flex flex-row justify-between">
                    <p>Balance</p>
                    <span className="text-font">EGP{client.balance}</span>
                  </div>
                  {/* <Link to={"/dashboard/withdraw"} className="text-primary mb-3">
                    Withdraw
                  </Link> */}
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Purchase balance</p>
                    <span className="text-font">EGP0</span>
                  </div>
                  {/* <Link to={"/dashboard/withdraw"} className="text-primary">
                    Add funds
                  </Link> */}
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Pending Withdrawls</p>
                    <span className="text-font">EGP0</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Payments Received</p>
                    <span className="text-font">EGP0</span>
                  </div>
                </div>
                {/* <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Points</p>
                    <span className="text-font">0.00 pts</span>
                  </div>
                  <Link to={"/dashboard/withdraw"} className="text-primary">
                    Convert points
                  </Link>
                </div> */}
              </div>
              <div className="my-8 text-black">
                <h3 className="text-2xl mb-3">Daily Tasks</h3>
                <InfoAlert
                  msg="You can earn
                  good money by completing the following tasks."
                />
                {props.services.map((service, index) => (
                  <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                    <div className="w-full flex flex-row justify-between">
                    <p className="flex flex-row items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-primary" /> {service.name}
                    </p>
                    <span className="text-font">{service.pending}/{service.completed}</span>
                    </div>
                  </div>
                ))}
                <h3 className="text-primary mt-8 cursor-pointer">
                  Earn points by inviting your friends{" "}
                  <Link to={"/"}>(Link)</Link>
                </h3>
              </div>
              <div className="my-8 text-black">
                <h3 className="text-2xl mb-3">Referral Stats</h3>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Direct Referrals</p>
                    <span className="text-font">0</span>
                  </div>
                  {/* <Link to={"/dashboard/withdraw"} className="text-primary">
                    Buy Referrals
                  </Link> */}
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Earned so far</p>
                    <span className="text-font">{client.points}</span>
                  </div>
                </div>
              </div>
              <div className="my-8 text-black">
                <h3 className="text-2xl mb-3">Your advertisement clicks</h3>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Your clicks</p>
                    <span className="text-font">0</span>
                  </div>
                </div>
                {/* <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Your referral clicks</p>
                    <span className="text-font">0</span>
                  </div>
                </div> */}
              </div>
              <div className="my-8 text-black">
                <h3 className="text-2xl mb-3">Video Ads Stats</h3>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Total plays</p>
                    <span className="text-font">0</span>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-full flex flex-row justify-between">
                    <p>Earned</p>
                    <span className="text-font">EGP0</span>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div className="py-3 px-3 text-black">
              <div className="mb-4">
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Ad Credits</p>
                    <span className="text-font">0</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Buy credits ]
                    </Link>
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Advertise ]
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Video Ads Credits</p>
                    <span className="text-font">0</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Buy credits ]
                    </Link>
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Advertise ]
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Banner Credits</p>
                    <span className="text-font">0</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Buy credits ]
                    </Link>
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Advertise ]
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Text Ad Credits</p>
                    <span className="text-font">0</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Buy credits ]
                    </Link>
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Advertise ]
                    </Link>
                  </div>
                </div>
                <div className="flex flex-row justify-between border-b-[1px] mt-2 pb-3">
                  <div className="w-[352px] flex flex-row justify-between">
                    <p>Link Ad Credits</p>
                    <span className="text-font">0</span>
                  </div>
                  <div className="flex flex-row items-center gap-3">
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Buy credits ]
                    </Link>
                    <Link to={"/dashboard/withdraw"} className="text-primary">
                      [ Advertise ]
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Panel>
          {/* <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div>{renderLineChart}</div>
          </Tab.Panel> */}
          <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div className="mb-8 text-black">
              <h3 className="text-lg mb-2">Login Failures :</h3>
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
                  <td colSpan={4} className="text-center py-4">No login Failures found</td>
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
