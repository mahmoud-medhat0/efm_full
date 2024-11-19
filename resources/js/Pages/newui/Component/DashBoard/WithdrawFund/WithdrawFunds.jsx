import React, { useState } from "react";
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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Inertia from "@inertiajs/inertia";
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
  return (
    <DashboardLayout>
      <h2 style={{
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "#808892",
        textAlign: "center"
      }}>Withdraw Funds</h2>

      
        <div style={styles.card}>
          <div style={styles.logo}>
            <img style={styles.logoTitle} src={upgred} alt="Logo" />
          </div>
        { selectedMethod && selectedMethod.withdrawAccounts.length > 0 && (
            selectedMethod.withdrawAccounts.map((account) => (
                        <div style={styles.inputWrapper}>
                        <label style={styles.label}>{Object.keys(JSON.parse(account.data))[0].replace(/\b\w/g, char => char.toUpperCase())}</label>
                        <div style={styles.inputWithIcon}>
                          <input disabled value={JSON.parse(account.data)[Object.keys(JSON.parse(account.data))[0]]} placeholder={Object.keys(JSON.parse(account.data))[0]} style={styles.input} />
                        </div>
                      </div>
            ))
          )}
          <form style={styles.form}>
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Method</label>
              <div style={{ ...styles.inputWithIcon, display: "block" }}>
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
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Amount</label>
              <div style={styles.inputWithIcon}>
                <img style={styles.icon} src={mony} alt="Amount Icon" />
                <input type="number" placeholder="0" style={styles.inputes} value={amount} onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      calcTotal();
                    }
                  }} onInput={handleAmountChange}
                  min="0"
                  />
                <span style={styles.egpText}>EGP</span>
              </div>
            </div>

            {/* Total */}
            <div style={styles.inputWrapper}>
              <label style={styles.label}>Total</label>
              <div style={styles.inputWithIcon}>
                <img style={styles.icon} src={toteld} alt="Total Icon" />
                <input type="text" placeholder="0" style={styles.inputes} value={total} disabled/>
                <span style={styles.egpText}>EGP</span>
              </div>
            </div>

            {/* Buttons */}
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.upgradeButton}>
                Send
              </button>
              <button type="button" style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      

      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Add Withdraw Account</h2>
            <p style={styles.modalSubtitle}>
              The Selected Method has the following fields
            </p>
            <div style={styles.modalInputWrapper}>
              {selectedMethod.withdrawFields.map((field) => (
                <div key={field.id}>
                  <label style={styles.modalLabel}>{field.name[locale]}</label>
                  <div style={styles.inputWithIcon}>
                  <input type={field.type} placeholder={field.name['en']} style={styles.input} {...registerModal(field.name['en'])}/>
                  </div>
              </div>
            ))}
            </div>
            <div style={styles.modalButtonContainer}>
              <button style={styles.upgradeButton} onClick={handleSubmitModal(onSubmitModal)}>
                send
              </button>
              <button style={styles.cancelButton} onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

const styles = {
  headerText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#808892",
    textAlign: "center",
    margin: "0 auto",
  },
  orderInput :{
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    transition: "border-color 0.3s ease",
    fontSize: "0.7em",
  },
  input: {
    border: "none",
    outline: "none",
    fontSize: "85%",
    color: "#555",
    backgroundColor:"unset"
  },
  inputes: {
    border: "none",
    outline: "none",
    fontSize: "85%",
    color: "#555",
    width: "90%",
  },
  card: {
    width: "100%",
    maxWidth: "792px",
    backgroundColor: "#fff",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    margin: "20px auto",
  },
  logoTitle: {
    width: "73px",
    margin: "10px auto",
  },
  inputWrapper: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    marginRight:"632px",
    color:"#DFBC8A"
  },
  inputWithIcon: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    position: "relative",
    flexDirection: "row",
  },
  egpText: {
    position: "absolute",
    right: "10px",
    fontSize: "14px",
    color: "#555",
  },
  methodIcon: {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "10px",
  },
  select: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "16px",
    color: "#555",
    appearance: "none",
    backgroundColor: "transparent",
  },
  dropdownIcon: {
    fontSize: "20px",
    color: "#888",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    flexDirection: "row",
  },
  upgradeButton: {
    flex: 1,
    backgroundColor: "#DFBC8A",
    color: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "background-color 0.3s ease",
    ':hover': {
      backgroundColor: "#cfa06a",
    },
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ddd",
    color: "#333",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    ':hover': {
      backgroundColor: "#bbb",
    },
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
  },
  modalTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    color:"#808892"
  },
  modalSubtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#808892",
  },
  modalInputWrapper: {
    display: "flex"
    ,
        alignItems: "center",
        border: "1px solid rgb(221, 221, 221)",
        borderRadius: "5px",
        padding: "10px"
  },
  modalLabel: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color:"#808892"
  },
  modalButtonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  '@media (max-width: 768px)': {
    card: {
      padding: "15px",
    },
    inputWithIcon: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    buttonContainer: {
      flexDirection: "column",
    },
    egpText: {
      position: "static",
      marginTop: "5px",
    },
    upgradeButton: {
      marginRight: "0",
      marginBottom: "10px",
    },
  },
  '@media (max-width: 480px)': {
    card: {
      padding: "10px",
    },
    inputWithIcon: {
      padding: "5px",
    },
    upgradeButton: {
      fontSize: "14px",
      padding: "8px",
    },
    cancelButton: {
      fontSize: "14px",
      padding: "8px",
    },
  },
};

export default WithdrawFunds;
