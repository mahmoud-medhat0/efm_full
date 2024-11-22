import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import mony from "../../../photo/mony.svg";
import orangee from "../../../photo/orange.svg";
import weeee from "../../../photo/we pay.svg";
import insta from "../../../photo/انستباي.svg";
import vode from "../../../photo/vodefone.svg";
import bankk from "../../../photo/banx.svg";
import upgred from "../../../photo/upgreed.svg";
import toteld from "../../../photo/withdraw.svg";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { usePage } from "@inertiajs/inertia-react";
import Select from "react-select";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import Inertia from "@inertiajs/inertia";
import styles from "./WithdrawFunds.module.css";

const WithdrawFunds = () => {
    const methods = usePage().props.methods;
    const { lang: locale, app_url } = usePage().props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [selectedMethodOption, setSelectedMethodOption] = useState([]);
    const [amount, setAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedOption,setselectedOption] = useState([]);
    const serviceOptions = methods.map(method => ({
      value: method.id,
      label: (
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px' }}>
              <img 
                  src={`${app_url}/storage/${method.logo}`} 
                  alt={`${method.name} Icon`} 
                  style={{ width: '20px', marginRight: '8px' }} 
              />
              {method.name}
          </div>
      ),
    }));
    const handleMethodChange = (method) => {
      const selectedMethod = methods.find(option => option.id === method.value);
      setSelectedMethod(selectedMethod);
      setSelectedMethodOption(method);
      if (selectedMethod && selectedMethod.withdrawAccounts.length == 0 && selectedMethod.withdrawFields && selectedMethod.withdrawFields.length > 0) {
        toast.error("You don't have any withdraw accounts. Please add one to proceed.", {
          position: "bottom-center",
          duration: 3000,
        });
        openModal();
      }
      calcTotal();
    };

    const formatOptionLabel = ({ name, logo }) => (
        <div style={{ display: "flex", alignItems: "center" }}>
            <img
                src={app_url + "/storage/" + logo}
                alt=""
                style={{ width: "30px", height: "20px", marginRight: "10px" }}
            />
            {name}
        </div>
    );
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        setError,
        formState: { errors: modalErrors },
    } = useForm();
    const onSubmitModal = async (data) => {
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
                        response.data.errors[key].forEach((errorMsg) => {
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
            const errorObj = error;
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
    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(value);
        calcTotal();
    };

    useEffect(() => {
        calcTotal();
    }, [amount]);

    const calcTotal = () => {
        if(selectedMethod){
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
        }else{
            toast.error("Please select a Withdraw method");
        }
    };
  return (
    <DashboardLayout>
      <h2 className={styles.headerText}>Withdraw Funds</h2>

      
        <div className={styles.card}>
          <div className={styles.logo}>
            <img className={styles.logoTitle} src={upgred} alt="Logo" />
          </div>
        { selectedMethod && selectedMethod.withdrawAccounts.length > 0 && (
            selectedMethod.withdrawAccounts.map((account) => (
                        <div className={styles.inputWrapper}>
                        <label className={styles.label}>{Object.keys(JSON.parse(account.data))[0].replace(/\b\w/g, char => char.toUpperCase())}</label>
                        <div className={styles.inputWithIcon}>
                          <input disabled value={JSON.parse(account.data)[Object.keys(JSON.parse(account.data))[0]]} placeholder={Object.keys(JSON.parse(account.data))[0]} className={styles.input} />
                        </div>
                      </div>
            ))
          )}
          <form className={styles.form}>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Method</label>
              <div className={`${styles.block}`}>
              <Select
                options={serviceOptions}
                className={styles.orderInput}
                styles={{ control: (base) => ({ ...base, fontSize: '15px' }) }}
                placeholder="Select a service"
                style={{fontSize:"15px"}}
                value={selectedMethodOption}
                onChange={(selectedOption) => handleMethodChange(selectedOption)}
              />
              </div>
            </div>

            {/* Amount */}
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Amount</label>
              <div className={styles.inputWithIcon}>
                <img className={styles.icon} src={mony} alt="Amount Icon" />
                <input type="number" placeholder="0" className={styles.inputes} value={amount} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      calcTotal();
                    }
                  }} onInput={handleAmountChange}
                  min="0"
                  />
                <span className={styles.egpText}>EGP</span>
              </div>
            </div>

            {/* Total */}
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Total</label>
              <div className={styles.inputWithIcon}>
                <img className={styles.icon} src={toteld} alt="Total Icon" />
                <input type="text" placeholder="0" className={styles.inputes} value={total} disabled/>
                <span className={styles.egpText}>EGP</span>
              </div>
            </div>

            {/* Buttons */}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.upgradeButton}>
                Send
              </button>
              <button type="button" className={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Add Withdraw Account</h2>
            <p className={styles.modalSubtitle}>
              The Selected Method has the following fields
            </p>
            <div className={styles.modalInputWrapper}>
              {selectedMethod.withdrawFields.map((field) => (
                <div key={field.id}>
                  <label className={styles.modalLabel}>{field.name[locale]}</label>
                  <div className={styles.inputWithIcon}>
                  <input type={field.type} placeholder={field.name['en']} className={styles.input} {...registerModal(field.name['en'])}/>
                  </div>
              </div>
            ))}
            </div>
            <div className={styles.modalButtonContainer}>
              <button className={styles.upgradeButton} onClick={handleSubmitModal(onSubmitModal)}>
                send
              </button>
              <button className={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default WithdrawFunds;
