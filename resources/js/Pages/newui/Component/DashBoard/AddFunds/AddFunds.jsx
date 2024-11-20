import { usePage } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import copy from "../../../photo/copyicon.svg";
import mony from "../../../photo/mony.svg";
import orangee from "../../../photo/orange.svg";
import weeee from "../../../photo/we pay.svg";
import insta from "../../../photo/انستباي.svg";
import vode from "../../../photo/vodefone.svg";
import bankk from "../../../photo/banx.svg";
import Select from "react-select";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
const AddFunds = () => {
    const [attachment, setAttachment] = useState(null);
    const page = usePage();
    const methods = page.props.methods;
    const { lang: locale, app_url } = usePage().props;
    const customer = page.props.auth.client;
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [total, setTotal] = useState(0);
    const [amount, setAmount] = useState(0);
    const [vat, setVat] = useState(0);
    const [charge, setCharge] = useState(0);
    const { register, handleSubmit } = useForm();
    const [selectedMethodOption, setSelectedMethodOption] = useState([]);
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
    const handleMethodChange = (selectedOption) => {
        const selectedMethod = methods.find(option => option.id === selectedOption.value);
        setSelectedMethod(selectedMethod);
        setSelectedMethodOption(selectedOption);
        console.log('selectedMethod',selectedMethod);
        // Check if the selected method has client fields
        if (selectedMethod.client_fields && selectedMethod.client_fields.length > 0) {
            selectedMethod.client_fields.forEach((field) => {
                if (field.type === "image") {
                    // Handle image fields if necessary
                }
            });
        }
    };

    const handleAttachmentChange = (file, fieldName) => {
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAttachment((prevAttachments) => ({
                ...prevAttachments,
                [fieldName]: { file, preview: fileURL },
            }));
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            setAttachment(fileURL);
        }
    };

    const handleRemoveAttachment = (fieldName) => {
        setAttachment((prevAttachments) => {
            const updatedAttachments = { ...prevAttachments };
            delete updatedAttachments[fieldName];
            return updatedAttachments;
        });
    };
    const calcTotal = () => {
        if (amount > 0) {
            let charge = 0;

            // Calculate the charge based on the type
            if (selectedMethod.charge_type_deposit === "percentage") {
                charge =
                    (parseFloat(amount) * selectedMethod.charge_deposit) / 100;
            } else {
                charge = parseFloat(selectedMethod.charge_deposit ?? "0");
            }
            let vat = 0;
            if (selectedMethod.vat_deposit_type === "percentage") {
                vat = (parseFloat(amount) * selectedMethod.vat_deposit) / 100;
            } else {
                vat = parseFloat(selectedMethod.vat_deposit ?? "0");
            }
            setVat(vat);
            setCharge(charge);
            // Calculate the total by subtracting the charge from the amount
            const calculatedTotal = parseFloat(amount) + charge + vat;

            // Ensure the total is not negative
            setTotal(calculatedTotal > 0 ? calculatedTotal : 0);
        } else {
            setTotal(0);
        }
    };
    const copyToClipboard = () => {
        const referralLink = selectedMethod.target_deposit;
        navigator.clipboard
            .writeText(referralLink)
            .then(() => {
                toast.success("Data copied to clipboard!");
            })
            .catch((err) => {
                toast.error("Failed to copy: ", err);
            });
    };
    useEffect(() => {
        if (page.props.amount) {
            setAmount(page.props.amount);
        }
    }, [page.props.amount]); // Only run this effect when page.props.amount changes
    useEffect(() => {
        if (page.props.method) {
            setSelectedMethod(page.props.method);
        }
    }, [page.props.method]);
    useEffect(() => {
        calcTotal();
    }, [amount, selectedMethod]);
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedMethod) {
                toast.error("Please select a Deposit method");
                return;
            }
            if (amount <= 0) {
                toast.error("Please enter an amount");
                return;
            }
            if (selectedMethod.attachment && (!attachment || !attachment["attachment"])) {
                toast.error("Please upload an image");
                return;
            }

            const formData = new FormData();
            formData.append("selectedMethod", selectedMethod.id);
            formData.append("amount", amount);
            if (attachment["attachment"]) {
                formData.append("attachment", attachment["attachment"].file);
            }

            if (selectedMethod.client_fields && selectedMethod.client_fields.length > 0) {
                selectedMethod.client_fields.forEach((field) => {
                    if (field.type === 'image') {
                        if (attachment[field.name['en']]) {
                            formData.append(field.name['en'], attachment[field.name['en']].file);
                        } else {
                            toast.error(`Please upload an image for ${field.name[locale] || field.name['en']}`);
                            return;
                        }
                    } else {
                        const fieldValue = document.getElementById(field.name['en'])?.value;
                        formData.append(field.name['en'], fieldValue);
                    }
                });
            }

            const config = {
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(
                route("client.dashboard.deposit.post"),
                formData,
                config
            );

            if (response.data.success) {
                toast.success(
                    response.data.message + " with transaction id: " + response.data.tnx
                );
                setTimeout(() => {
                    Inertia.visit(route("client.dashboard.dashboard"));
                }, 1000);
            } else {
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
                    toast.error(response.data.message, {
                        position: "top-center",
                        duration: 2000,
                    });
                }
            }
        } catch (error) {
            toast.error("Error submitting form: " + error);
        } finally {
        }
    };
    const [isSendButtonHovered, setIsSendButtonHovered] = useState(false);
    const [isCancelButtonHovered, setIsCancelButtonHovered] = useState(false);
    return (
        <DashboardLayout>
             <h1 style={styles.title}>Add Funds</h1>
            <div style={styles.container}>
                <div  style={{width: "auto",height: "auto",backgroundColor:"#fff",
                    borderRadius: "15px",
                    padding:"20px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    marginTop:"12px"
                    }}>
                    <div style={styles.header}>
                       
                        {selectedMethod && selectedMethod.target_deposit && (
                            <p style={styles.phone} onClick={copyToClipboard}>
                                {selectedMethod.target_deposit}{" "}
                                <img
                                    style={{ padding: "8px" }}
                                    src={copy}
                                    alt="copy"
                                />
                            </p>
                        )}
                    </div>
                    <form style={styles.form} onSubmit={handleSubmit}>
                        <div style={styles.inputWrapperaddfunds}>
                            <label style={styles.label}>
                                Method of transfer
                            </label>
                            <div style={{ ...styles.inputWithIcon, display: "block" }}>
                            <Select
                                    options={serviceOptions}
                                    onChange={(selectedOption) => handleMethodChange(selectedOption)}
                                    styles={{ control: (base) => ({ ...base, fontSize: '15px' }) }}
                                    placeholder="Select a Method"
                                    value={selectedMethodOption}
                                />  
                            </div>
                        </div>

                        <div style={styles.inputWrapperaddfunds}>
                            <label style={styles.label}>Amount</label>
                            <div style={styles.inputWithIcon}>
                                <img
                                    style={styles.icon}
                                    src={mony}
                                    alt="amount icon"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter The Amount"
                                    style={{ width: "90%", fontWeight: "bold", fontSize: "14px" }}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                            {selectedMethod && selectedMethod.client_fields && selectedMethod.client_fields.length > 0 && (
                              selectedMethod.client_fields.map((field) => (
                                <div style={styles.inputWrapperaddfunds} key={field.id}>
                                  <label
                                    htmlFor={field.name[locale]}
                                    style={styles.label}
                                  >
                                    {field.name[locale] || field.name['en']}
                                  </label>
                                  {field.type === 'text' && (
                                    <input 
                                      id={field.name['en']} 
                                      type="text" 
                                      required={field.required} 
                                      style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '4px' 
                                      }} 
                                    />
                                  )}
                                  {field.type === 'number' && (
                                    <input 
                                      id={field.name['en']} 
                                      type="number" 
                                      required={field.required} 
                                      style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '4px' 
                                      }} 
                                    />
                                  )}
                                  {field.type === 'image' && (
                                    <input
                                      type="file"
                                      name={field.name['en']}
                                      style={{ 
                                        width: '100%', 
                                        padding: '8px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '4px' 
                                      }}
                                      onChange={(e) => handleAttachmentChange(e.target.files[0], field.name['en'])}
                                      required={field.required}
                                    />
                                  )}
                                </div>
                              ))
                            )}
                        <div style={styles.row}>
                            <div style={styles.column}>
                                <label style={styles.label}>Fees</label>
                                <div style={styles.inputWithCurrency}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        style={styles.inputSmall}
                                        value={charge}
                                    />
                                    <span style={styles.currency}>EGP</span>
                                </div>
                            </div>
                            <div style={styles.column}>
                                <label style={styles.label}>Vat</label>
                                <div style={styles.inputWithCurrency}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        style={styles.inputSmall}
                                        value={vat}
                                        disabled
                                    />
                                    <span style={styles.currency}>EGP</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.totalContainer}>
                            <h2 style={styles.totalLabel}>Total</h2>
                            <h3 style={styles.totalValue}>{total} EGP</h3>
                        </div>
                        {selectedMethod &&
                                selectedMethod.attachment !== false &&
                        <div style={styles.inputWrapperaddfunds}>
                            <label style={styles.label}>
                                Uploading the file
                            </label>
                            <div style={styles.fileUpload}>
                                <span style={styles.uploadText}>
                                    Attach The File
                                </span>
                                <input
                                    type="file"
                                    style={styles.fileInput}
                                    onChange={(e) => handleAttachmentChange(e.target.files[0], "attachment")}
                                />
                            </div>
                            {attachment && attachment["attachment"] && (
                                <div style={styles.previewContainer}>
                                    <img
                                        src={attachment["attachment"].preview}
                                        alt="Preview"
                                        style={styles.previewImage}
                                    />
                                    <button
                                        style={styles.removeButton}
                                        onClick={() => handleRemoveAttachment("attachment")}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                        }
                        <div style={styles.buttonContainer}>
                            <button
                                type="submit"
                                style={{
                                    ...styles.sendButton,
                                    ...(isSendButtonHovered ? styles.sendButtonHover : {}),
                                }}
                                onMouseEnter={() => setIsSendButtonHovered(true)}
                                onMouseLeave={() => setIsSendButtonHovered(false)}
                                onClick={onSubmit}
                            >
                                Send
                            </button>
                            <button
                                type="button"
                                style={{
                                    ...styles.cancelButton,
                                    ...(isCancelButtonHovered ? styles.cancelButtonHover : {}),
                                }}
                                onMouseEnter={() => setIsCancelButtonHovered(true)}
                                onMouseLeave={() => setIsCancelButtonHovered(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    <div style={styles.logosContainer}>
                        <img src={orangee} alt="Logo 1" style={styles.logo} />
                        <img src={weeee} alt="Logo 2" style={styles.logo} />
                        <img src={insta} alt="Logo 3" style={styles.logo} />
                        <img src={vode} alt="Logo 4" style={styles.logo} />
                        <img src={bankk} alt="Logo 5" style={styles.logo} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        backgroundColor: "#f9f9f9",
    },
    card: {
        width: "400px",
        backgroundColor: "#fff",
        borderRadius: "15px",
        padding: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
    },
    title: {
        fontSize: "1.4rem",
        fontWeight: "bold",
        color: "#808892",
        textAlign: "center",
      
        "@media (max-width: 768px)": {
          textAlign: "center",
          fontWeight: "bold",
        }
    },
    phone: {
        fontSize: "16px",
        color: "#DFBC8A",
        textAlign: "right",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
    },
    phoneIcon: {
        marginLeft: "5px",
    },
    totalContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
    },
    totalLabel: {
        fontSize: "24px",
        color: "#DFBC8A",
        fontWeight: "bold",
        
    },
    totalValue: {
        fontSize: "24px",
        color: "#DFBC8A",
        fontWeight: "bold",
       
    },
    form: {
        textAlign: "left",
    },
    inputWrapperaddfunds: {
        marginBottom: "15px",
    },
    label: {
        display: "block",
        marginBottom: "5px",
        fontSize: "14px",
        color: "#DFBC8A",
        fontWeight: "bold",
    },
    inputWithIcon: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "10px",
    },
    icon: {
        marginRight: "10px",
        width: "40px",
        height: "40px",
    },
    fileUpload: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px dashed #ddd",
        borderRadius: "5px",
        height: "50px",
        color: "#999",
        fontSize: "14px",
        position: "relative",
    },
    uploadText: {
        pointerEvents: "none",
    },
    fileInput: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0,
        cursor: "pointer",
    },
    previewContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
        padding: "10px",
        marginTop: "10px",
        border: "1px solid #ddd",
    },
    previewImage: {
        width: "60px",
        height: "60px",
        borderRadius: "5px",
        objectFit: "cover",
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        padding: "5px 10px",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "14px",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        gap: "15px",
        marginBottom: "20px",
    },
    column: {
        width: "48%",
        display: "flex",
        flexDirection: "column",
    },
    inputWithCurrency: {
        display: "flex",
        alignItems: "center",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        height: "50px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    inputSmall: {
        flex: "1",
        border: "none",
        outline: "none",
        fontSize: "16px",
        width: "10%",
        textAlign: "left",
        color: "#555",
        backgroundColor: "transparent",
    },
    currency: {
        marginLeft: "-96px",
        fontSize: "16px",
        color: "#888",
        fontWeight: "bold",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginTop: "20px",
    },
    sendButton: {
        flex: "1",
        backgroundColor: "#DFBC8A",
        color: "#fff",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s", // Smooth transition
    },
    sendButtonHover: {
        backgroundColor: "#a87c6b", // Darker shade for hover
    },
    cancelButton: {
        flex: "1",
        backgroundColor: "#ddd",
        color: "#333",
        padding: "10px",
        borderRadius: "5px",
        border: "none",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s", // Smooth transition
    },
    cancelButtonHover: {
        backgroundColor: "#bbb", // Darker shade for hover
    },
    logosContainer: {
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px",
    },
    logo: {
        width: "55px",
        height: "55px",
    },
};

export default AddFunds;
