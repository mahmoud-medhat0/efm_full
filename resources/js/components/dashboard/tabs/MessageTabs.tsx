import { Tab } from "@headlessui/react";
import {
  CheckBadgeIcon,
  InboxIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import Input from "../../schema/Input";
import Textarea from "../../schema/Textarea";
import Button from "../../schema/Button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function MessageTabs() {
  return (
    <div className="w-full px-2 py-12 sm:px-0">
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
            <InboxIcon className="w-5 h-5" /> Inbox
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
            <PencilSquareIcon className="w-5 h-5" /> Compose
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
              <table className="w-full">
                <thead className="border-b border-black font-normal">
                  <tr>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      Date
                    </th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      Subject
                    </th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      From
                    </th>
                    <th className="text-left py-3 text-primary cursor-pointer">
                      <CheckBadgeIcon className="w-5 h-5" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100">
                  <tr>
                    <td colSpan={4} className="pt-3 text-sm">
                      You don't have personal messages.
                    </td>
                  </tr>
                </tbody>
              </table>
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
                  <label htmlFor="to" className="text-black text-xl">
                    To
                  </label>
                  <Input id="to" />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="subject" className="text-black text-xl">
                    Subject
                  </label>
                  <Input id="subject" />
                </div>
                <div className="space-y-2 pb-1">
                  <label htmlFor="msg" className="text-black text-xl">
                    Message
                  </label>
                  <Textarea id="msg" />
                </div>
                <Button fullWidth className="gap-3">
                  Send <PaperAirplaneIcon className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
