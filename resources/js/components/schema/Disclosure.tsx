/* eslint-disable react-refresh/only-export-components */
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { memo } from "react";

interface IProps {
  question: string;
  answer: string;
}

const MyDisclosure = ({ question, answer }: IProps) => {
  return (
    <div className="w-full  px-4 pt-6 text-center">
      <div className="mx-auto w-full max-w-xl p-2 border-b-2 text-center">
        <Disclosure as="div" className="mt-2 text-center">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between gap-10 rounded-lg bg-transparent py-2 text-center text-sm font-medium text-black focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span className="text-xl">{question}</span>
                <ChevronDownIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-black`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-base text-gray-400">
                {answer}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default memo(MyDisclosure);
