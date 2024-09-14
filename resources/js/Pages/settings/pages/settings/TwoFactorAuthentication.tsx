import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";
import { Switch } from "@headlessui/react";
import DashboardLayout from "../../../../Pages/settings/Layout";
import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Modal from "../../../../components/schema/Modal"; // Adjust the import path as necessary
import axios from "axios";
import { route } from "ziggy-js";
import { toast } from 'react-hot-toast';
import Input from '../../../../components/schema/Input';
import Button from '../../../../components/schema/Button';
const TwoFactorAuthentication = () => {
  const props = usePage().props;
  const user = props.auth.client;
  console.log(user.is_2a);
  const [is2faEnabled, setIs2faEnabled] = useState(user.is_2a);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [code, setCode] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const toggle2fa = () => {
    if (!is2faEnabled) {
      axios.get(route('client.dashboard.2fa-qr-url')).then((response) => {
        setQrCodeUrl(response.data.qrCodeUrl);
        setIsModalOpen(true);
      });
    } else {
      setIsConfirmModalOpen(true);
    }
  };

  const confirmDisable2fa = () => {
    axios.post(route('client.dashboard.disable-2fa.post')).then((response) => {
      setIs2faEnabled(false);
      toast.success(response.data.message);
      setIsConfirmModalOpen(false);
    });
  };

  const cancelDisable2fa = () => {
    setIsConfirmModalOpen(false);
  };

  const enable2fa = () => {
    axios.post(route('client.dashboard.enable-2fa.post'), { code: code }).then((response) => {
      if (response.data.success) {
        setIs2faEnabled(true);
        setIsModalOpen(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="w-full h-auto mt-20">
        <WelcomeTab />
        <div className="w-full px-2 py-12 sm:px-0">
          <h3 className="text-lg mb-4">Two Factor Authentication</h3>
          <div className='w-full flex flex-col'>
            <div className="border border-[#63778652] py-4 px-6 rounded-xl shadow-md flex flex-col space-y-5 flex-grow">
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row items-center justify-between space-x-5'>
                  <div className="bg-[#E8F0F7] rounded-full w-14 max-sm:w-28 p-3">
                    {is2faEnabled ? <CheckBadgeIcon className="text-green-600" /> : <XMarkIcon className="text-red-600" />}
                  </div>
                  <div className='flex flex-col items-start justify-between'>
                    <h4 className={`${is2faEnabled ? 'text-green-600' : 'text-red-600'} font-medium`}>{is2faEnabled ? 'Active' : 'Inactive'}</h4>
                  </div>
                </div>
                <Switch
                  checked={is2faEnabled}
                  onChange={toggle2fa}
                  className={`${
                    is2faEnabled ? 'bg-green-600' : 'bg-red-600'
                  } relative flex h-[29px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75`}
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    className={`${
                      is2faEnabled ? 'translate-x-9' : 'translate-x-0'
                    } pointer-events-none flex justify-center items-center h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                  >
                    {is2faEnabled ? <CheckBadgeIcon className="text-green-600" /> : <XMarkIcon className="text-red-600" />}
                  </span>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        title="Scan this QR Code to Enable 2FA"
        description="Use your authenticator app to scan the QR code below."
      >
        <div className="p-6 bg-white rounded-lg shadow-md">
          <img src={qrCodeUrl} alt="2FA QR Code" className="mx-auto mb-4 w-50 max-w-xs h-50" />
          <p className="text-center mb-4">Please enter the code from your authenticator app to enable 2FA.</p>
          <Input type="number" onChange={(e) => setCode(e.target.value)} placeholder="Enter code" className="mt-2 w-full p-2 rounded border border-gray-300" />
          <div className="flex justify-center space-x-2 mt-4">
            <Button onClick={enable2fa} className="bg-blue-500 text-white px-4 py-2 rounded">Enable</Button>
            <Button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Close</Button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isConfirmModalOpen}
        closeModal={cancelDisable2fa}
        title="Confirm Disable 2FA"
        description="Are you sure you want to disable Two Factor Authentication?"
      >
        <div className="flex justify-center space-x-2 mt-4">
          <button onClick={confirmDisable2fa} className="bg-red-500 text-white px-4 py-2 rounded">Disable</button>
          <button onClick={cancelDisable2fa} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default TwoFactorAuthentication;
