import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
  NewspaperIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import {route} from 'ziggy-js'
const Help = () => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-right">
        <div className="text-gray-400 sely">
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-transparent px-4 py-2 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Help
            <ChevronDownIcon className="mr-1 ml-2 h-6 w-5" aria-hidden="true" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Link href={route('client.faq')}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-primary"
                        } group flex w-full items-center rounded-md pr-2 py-2 text-sm duration-300 gap-1`}
                    >
                      {active ? (
                        <ChatBubbleLeftEllipsisIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ChatBubbleLeftEllipsisIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      FAQ
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Link href={route('client.news')}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-primary"
                        } group flex w-full items-center rounded-md pr-2 py-2 text-sm duration-300 gap-1`}
                    >
                      {active ? (
                        <NewspaperIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <NewspaperIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      News
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Link href={route('client.support')}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-primary"
                        } group flex w-full items-center rounded-md pr-2 py-2 text-sm duration-300 gap-1`}
                    >
                      {active ? (
                        <UserGroupIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <UserGroupIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Support
                    </button>
                  )}
                </Menu.Item>
              </Link>
              <Link href={route('client.terms')}>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-primary text-white" : "text-primary"
                        } group flex w-full items-center rounded-md pr-2 py-2 text-sm duration-300 gap-1`}
                    >
                      {active ? (
                        <ExclamationCircleIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <ExclamationCircleIcon
                          className="ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Terms of Service
                    </button>
                  )}
                </Menu.Item>
              </Link>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Help;
