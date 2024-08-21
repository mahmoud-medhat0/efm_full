import MethodSelector from "../../../components/dashboard/membships/MethodSelector";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import Button from "../../../components/schema/Button";
import Input from "../../../components/schema/Input";
import RootLayout from "../Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import FileUpload from "../../../components/schema/dropify";
import axios from "axios";
import { route } from 'ziggy-js'; // Added import for route
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const AddFundsPage = () => {
  const page = usePage();
  const methods = page.props.methods;
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [attachment, setAttachment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const calcTotal = () => {
    if (amount > 0) {
      let charge = 0;
      
      // Calculate the charge based on the type
      if (selectedMethod.charge_type_deposit === "percentage") {
        charge = (parseFloat(amount) * selectedMethod.charge_deposit) / 100;
      } else {
        charge = parseFloat(selectedMethod.charge_deposit);
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
    setAmount(value || 0);
  };

  const handleAttachmentChange = (file) => {
    setAttachment(file); // Update the attachment state
  };
  
  useEffect(() => {
    calcTotal();
  }, [amount, selectedMethod]);
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
        toast.error('Please select a Deposit method');
        return;
      }
      if(amount<=0){
        setIsLoading(false);
        toast.error('Please enter an amount');
        return;
      }
      if(selectedMethod.attachment && !attachment){
        setIsLoading(false);
        toast.error('Please upload a image');
        return;
      }
      const formData = new FormData();
      formData.append('selectedMethod', selectedMethod.id);
      formData.append('amount', amount);
      if (attachment) {
        formData.append('attachment', attachment);
      }

      const config = {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
          'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post(route('client.dashboard.deposit.post'), formData, config);
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
        <h3 className="text-lg mb-5">Add funds</h3>
        { selectedMethod && selectedMethod.description_deposit!=null  && selectedMethod.description_deposit !='' && (
          <div className="space-y-2 pb-1">
            <label htmlFor="description" className="text-black text-base">
              Description
        </label>
        <div id="description" style={{ border: "3px solid black", backgroundColor: "white" }} dangerouslySetInnerHTML={{ __html: selectedMethod.description_deposit }} />
          </div>
        )}
        <div className="pb-3">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} >
            <div className="space-y-2 pb-1">
              <label htmlFor="plan" className="text-black text-base">
                Method
              </label>
              {methods.length > 0 && <MethodSelector methods={methods} />}
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
            { selectedMethod && selectedMethod.attachment != false && (
                <div className="space-y-2 pb-1">
                  <FileUpload inputName="attachment"  allowedExtensions={['jpg', 'png', 'jpeg']}  onFileSelect={handleAttachmentChange}/>
                </div>
              )}
            <div className="space-y-2 pb-1">
              <label htmlFor="total" className="text-black text-base">
                Total
              </label>
              <Input id="total" value={total.toFixed(2)} readOnly />
            </div>
            <div className="flex flex-row gap-3">
              <Button fullWidth isLoading={isLoading}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </RootLayout>
  );
};

export default AddFundsPage;
