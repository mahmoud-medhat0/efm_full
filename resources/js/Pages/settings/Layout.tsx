import React, { useEffect,useState} from 'react';
import Footer from "../../components/Footer";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import DashboardNavbar from "../../components/dashboard/navbar/Navbar";
import devtools from 'devtools-detect';
import DevToolsListener from '../../components/dashboard/DevToolsDetection'; // Import the component
import { usePage } from "@inertiajs/inertia-react";
import toast from 'react-hot-toast';
import Modal from "../../components/schema/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Button from "../../components/schema/Button";
import { route } from "ziggy-js";
import { Link } from "@inertiajs/inertia-react";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const page = usePage();
  const user = page.props.auth.client;
  useEffect(() => {
    if (!user.has_active_subscription) {
      if (route().current() !== 'client.dashboard.membership' && route().current() !== 'client.dashboard.deposit' && route().current() !== 'client.dashboard.membership') {
        toast.error('You need to upgrade your account to access this page', {
          duration: 5000,
          position: 'top-right',
        });
        setShowModal(true); // Show modal if no active subscription
      }
    }
    const interval = setInterval(() => {
      if (devtools.isOpen && page.props.app_debug) {
        alert('Developer tools are open!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {page.props.app_debug && <DevToolsListener />}
      <div className="root-layout">
        <DashboardNavbar />
        <div className="flex flex-row justify-between h-full">
          <Sidebar />
          <div className="container">
          {showModal && (
            <Modal isOpen={showModal} closeModal={() => setShowModal(false)}>
                <div className='absolute top-[-20px] right-0'>
                    <div className='bg-[#E8F0F7] rounded-full p-1'>
                        <XMarkIcon className='w-6 h-6 cursor-pointer text-red-600' onClick={() => setShowModal(false)} />
                    </div>
                </div>
                <h2 className="text-black text-2xl font-medium mb-2">
                    Upgrade Your Account
                </h2>
                <p className="mb-4">You need to upgrade your account to access this page.</p>
                <div className="w-full">
                    <Link href={route('client.dashboard.membership')}>
                        <Button fullWidth variant='danger'>
                            Upgrade Now
                        </Button>
                    </Link>
                </div>
            </Modal>
            )}            
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DashboardLayout;
