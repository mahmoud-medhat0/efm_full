import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { usePage } from "@inertiajs/inertia-react";

export default function ServicesSelector({ services, onChange }) {
  const [selected, setSelected] = useState(services[0]);
  const page = usePage();
  const app_url = page.props.app_url;
  const handleChange = (service) => {
    setSelected(service);
    onChange(service); // Call the onChange callback
  };
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent pl-0 pr-10 text-left focus:outline-none sm:text-sm">
            <span className="block truncate text-base">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {services.map((service, Idx) => (
                <Listbox.Option
                  key={Idx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={service}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"} flex items-center`}
                      >
                        <img src={app_url+`storage/${service.icon}`} alt={service.name} className="w-5 h-5 rounded-full mr-2" />
                        {service.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
