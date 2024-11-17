import MethodSelector from "../../../components/dashboard/membships/MethodSelector";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import Button from "../../../components/schema/Button";
import Input from "../../../components/schema/Input";
import RootLayout from "../Layout";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
import { useState, useEffect } from "react";
import Modal from "../../../components/schema/Modal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios, { AxiosError } from 'axios'; // Added import for axios
import { route } from 'ziggy-js'; // Added import for route
import { IErrorResponse } from "../../../interfaces";
const WithdrawFundsPage = () => {
  const page = usePage();
  const methods = page.props.methods;
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const [amount, setAmount] = useState();
  const [total, setTotal] = useState(0);
  const calcTotal = () => {
    if (amount > 0) {
      let charge = 0;
      // Calculate the charge based on the type
      if (selectedMethod.charge_type_withdraw === "percentage") {
        charge = (parseFloat(amount) * selectedMethod.charge_withdraw) / 100;
      } else {
        charge = parseFloat(selectedMethod.charge_withdraw);
      }
  
      // Calculate the total by subtracting the charge from the amount
      const calculatedTotal = parseFloat(amount) - charge;
  
      // Ensure the total is not negative
      setTotal(calculatedTotal > 0 ? calculatedTotal : 0);
    } else {
      setTotal(0);
    }
  };

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(value);
  };
  useEffect(() => {
    calcTotal();
  }, [amount, selectedMethod]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { lang: locale, app_url } = usePage().props;
    // ** React Hook Form for Modal
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        setError,
        formState: { errors: modalErrors },
    } = useForm();
    const onSubmitModal: SubmitHandler<any> = async (data) => { // Fixed syntax error
      try {
        data.selectedMethod = selectedMethod.id;
          const response = await axios.post(route("client.dashboard.withdraw-account"), data);
          if ((response.status === 200 || response.status === 201) && response.data.success) {
              toast.success(response.data.message, {
                  position: "bottom-center",
                  duration: 2000,
              });
              closeModal();
              setIsLoading(false);
              Inertia.visit(route('client.dashboard.withdraw'));
          } else if (response.data.success === false) {
              if (response.data.errors) {
                  Object.keys(response.data.errors).forEach((key) => {
                      response.data.errors[key].forEach((errorMsg: string) => {
                          toast.error(errorMsg, {
                              position: "bottom-center",
                              duration: 2000,
                          });
                      });
                  });
              } else {
                  toast.error(response.data.message || "An error occurred", {
                      position: "bottom-center",
                      duration: 2000,
                  });
              }
          } else {
              toast.error(response.data.message || "An error occurred", {
                  position: "bottom-center",
                  duration: 2000,
              });
          }
      } catch (error) {
          console.error('Error during withdraw account creation:', error);
          const errorObj = error as AxiosError<IErrorResponse>;
          const message =
              errorObj.response?.data.error?.details?.message ||
              errorObj.response?.data.message ||
              "An error occurred during withdraw account creation";
          toast.error(`Withdraw account creation failed: ${message}`, {
              position: "bottom-center",
              duration: 3000,
          });
      }
  };
  useEffect(() => {
    if (selectedMethod.withdrawAccounts.length == 0) {
      toast.error("You don't have any withdraw accounts. Please add one to proceed.", {
        position: "bottom-center",
        duration: 3000,
      });
      openModal();
    }
  }, []);
  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    if (selectedMethod.withdrawAccounts.length == 0) {
      toast.error("You don't have any withdraw accounts. Please add one to proceed.", {
        position: "bottom-center",
        duration: 3000,
      });
      openModal();
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    setIsLoading(true);
    try{
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      if(!selectedMethod){
        setIsLoading(false);
        toast.error('Please select a withdrawal method');
        return;
      }
      if(amount<=0){
        setIsLoading(false);
        toast.error('Please enter an amount');
        return;
      }
      const formData = new FormData();
      formData.append('selectedMethod', selectedMethod.id);
      formData.append('amount', amount);
      formData.append('account_id', selectedMethod.withdrawAccounts[0].id);
      const config = {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(route('client.dashboard.withdraw.post'), formData, config);
      if(response.data.success){
        toast.success(response.data.message + ' with transaction id: ' + response.data.tnx);
        setTimeout(() => {
          window.location.replace(route('client.dashboard'));
      }, 1000);
      }else{
        Object.keys(response.data.errors).forEach((key) => {
          response.data.errors[key].forEach((errorMsg: string) => {
              toast.error(errorMsg, {
                  position: "bottom-center",
                  duration: 2000,
              });
          });
      });

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <RootLayout>
    <div>
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <div className="flex justify-between items-center">
          <h3 className="text-lg mb-5">Withdraw funds</h3>
          <div className="flex justify-end mb-4">
            {selectedMethod.withdrawAccounts && selectedMethod.withdrawAccounts.length == 0 && <Button onClick={() => setIsOpen(true)}>Add Withdraw Account</Button>}
          </div>
        </div>
        {selectedMethod && selectedMethod.description_withdraw!=null && selectedMethod.description_withdraw !='' && (
          <div className="space-y-2 pb-1">
            <label htmlFor="description" className="text-black text-base">
              Description
        </label>
        <div id="description" style={{ border: "3px solid black", backgroundColor: "white" }} dangerouslySetInnerHTML={{ __html: selectedMethod.description_withdraw   }} />
          </div>
        )}
        {selectedMethod.withdrawAccounts && selectedMethod.withdrawAccounts.length > 0 && (
          selectedMethod.withdrawAccounts.map((account) => (
            <div className="space-y-2 pb-1">
              <label htmlFor="" className="text-black text-base">
              {Object.keys(JSON.parse(account.data))[0]}
            </label>
            <div id="" style={{ border: "1.5px solid black", backgroundColor: "white" }} dangerouslySetInnerHTML={{ __html: Object.values(JSON.parse(account.data))[0]   }} />
          </div>
          ))
        )}
        <div className="pb-3">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2 pb-1">
              <label htmlFor="plan" className="text-black text-base">
                Method
              </label>
              {methods.length > 0 && <MethodSelector methods={methods} onChange={handleMethodChange}/>}
            </div>
            <div className="space-y-2 pb-1">
              <label htmlFor="amount" className="text-black text-base">
                Amount
              </label>
                <Input id="amount" type="number" placeholder="0.00"                  
                onChange={handleAmountChange}
                onInput={handleAmountChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      calcTotal();
                    }else{
                      calcTotal();
                    }
                  }}
                />
            </div>
            <div className="space-y-2 pb-1">
              <label htmlFor="total" className="text-black text-base">
                Total
              </label>
              <Input id="total" value={total.toFixed(2)} readOnly />
            </div>
            <div className="flex flex-row gap-3">
              <Button fullWidth isLoading={isLoading}>Withdraw</Button>
            </div>
          </form>
          {selectedMethod.withdrawFields && selectedMethod.withdrawFields.length > 0 && <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className='absolute top-[-20px] right-0'>
                    <div className='bg-[#E8F0F7] rounded-full p-1'>
                        <XMarkIcon className='w-6 h-6 cursor-pointer text-red-600' onClick={closeModal} />
                    </div>
                </div>
                <h2 className="text-black text-2xl font-medium mb-2">
                    Add Withdraw Account
                </h2>
                <form className='flex flex-col items-center justify-center space-y-5 pt-10 px-5' >
                    <p className="text-center mt-4">
                       The Selected Method has the following fields:
                    </p>

                    <div className='w-full flex-row items-center gap-2 p-2 rounded-lg'>
                    {selectedMethod.withdrawFields.map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.name['en']} className="text-black text-base">{field.name['en']}</label>
                            <Input
                                  {...registerModal(field.name['en'])} // Registering with react-hook-form
                                placeholder={field.name['en']}
                                type={field.type}
                                required={field.required}
                            />
                      </div>
                    ))}
                    </div>
                    <div className="w-full">
                        <Button fullWidth onClick={handleSubmitModal(onSubmitModal)}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>}
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default WithdrawFundsPage;
