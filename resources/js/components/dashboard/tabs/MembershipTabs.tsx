import { Tab } from "@headlessui/react";
import { CurrencyDollarIcon, WalletIcon } from "@heroicons/react/20/solid";
import Button from "../../schema/Button";
import ItemSelector from "../membships/ItemSelector";
import PlanSelector from "../membships/PlanSelector";
import MethodSelector from "../membships/MethodSelector";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MembershipTabs() {
  return (
    <div className="w-full px-2 py-6 sm:px-0">
      <Tab.Group>
        <Tab.List className="w-full mb-6 flex space-x-1 rounded-xl bg-background/20 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150 flex flex-row items-center justify-center gap-3",
                selected
                  ? "bg-white text-black font-medium shadow"
                  : "text-primary hover:bg-white/[0.12] hover:text-font"
              )
            }
          >
            <WalletIcon className="w-5 h-5" /> Upgrade using purchase balance
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                "w-full rounded-md py-2.5 text-sm font-medium leading-5",
                "ring-white/60 ring-offset-2 focus:outline-none focus:ring-2 duration-150 flex flex-row items-center justify-center gap-3",
                selected
                  ? "bg-white text-black font-medium shadow"
                  : "text-primary hover:bg-white/[0.12] hover:text-font"
              )
            }
          >
            <CurrencyDollarIcon className="w-5 h-5" />
            Upgrade using payment gateways
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2 rounded-md">
          <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div className="py-3 px-3">
              <form className="space-y-3">
                <div className="space-y-2 pb-1">
                  <label htmlFor="item" className="text-black text-base">
                    Item
                  </label>
                  <ItemSelector />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="plan" className="text-black text-base">
                    Plan
                  </label>
                  <PlanSelector />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="balance" className="text-black text-base">
                    Purchase balance
                  </label>
                  <input
                    className="cursor-pointer border-[1px] border-gray-300 shadow-lg focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary rounded-lg px-3 py-2 text-md w-full bg-transparent duration-200"
                    id="balance"
                    value={"0$"}
                    disabled
                    readOnly
                  />
                </div>
                <div className="flex flex-row gap-3">
                  <Button fullWidth>Submit</Button>
                  <Button fullWidth variant={"cancel"}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              "rounded-md bg-white p-3",
              "focus:outline-none"
            )}
          >
            <div className="py-3 px-3">
              <form className="space-y-3">
                <div className="space-y-2 pb-1">
                  <label htmlFor="item" className="text-black text-base">
                    Item
                  </label>
                  <ItemSelector />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="plan" className="text-black text-base">
                    Plan
                  </label>
                  <PlanSelector />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="plan" className="text-black text-base">
                    Method
                  </label>
                  <MethodSelector />
                </div>
                <div className="flex flex-row gap-3">
                  <Button fullWidth>Submit</Button>
                  <Button fullWidth variant={"cancel"}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
