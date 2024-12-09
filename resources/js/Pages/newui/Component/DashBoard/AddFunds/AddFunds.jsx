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
            <div className="Addfunds-serviceOption" >
                <img 
                    src={`${app_url}/storage/${method.logo}`} 
                    alt={`${method.name} Icon`} 
                   
                    className="Addfunds-serviceIcon"
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
                }
            });
        }
        calcTotal();
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
        if(selectedMethod){
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
        }else{
            toast.error("Please select a Deposit method");
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
            <h1 className="Addfunds-title">Add Funds</h1>
            <div className="Addfunds-container">
                <div className="Addfunds-card">
                    <div className="Addfunds-header">
                        {selectedMethod && selectedMethod.target_deposit && (
                            <p className="Addfunds-phone" onClick={copyToClipboard}>
                                {selectedMethod.target_deposit}{" "}
                                <img
                                    className="Addfunds-phoneIcon"
                                    src={copy}
                                    alt="copy"
                                />
                            </p>
                        )}
                    </div>
                    <form className="Addfunds-form" onSubmit={handleSubmit}>
                        <div className="Addfunds-inputWrapperaddfunds">
                            <label className="Addfunds-label">
                                Method of transfer
                            </label>
                            <div className="Addfunds-inputWithIcon">
                                <Select
                                    options={serviceOptions}
                                    onChange={(selectedOption) => handleMethodChange(selectedOption)}
                                    styles={{ control: (base) => ({ ...base, fontSize: '15px' }) }}
                                    className="Addfunds-select"
                                    placeholder="Select a Method"
                                    value={selectedMethodOption}
                                />  
                            </div>
                        </div>
                        <div className="Addfunds-inputWrapperaddfunds">
                            <label className="Addfunds-label">Amount</label>
                            <div className="Addfunds-inputWithIcon">
                                <img
                                    className="Addfunds-icon"
                                    src={mony}
                                    alt="amount icon"
                                />
                                <input
                                    type="text"
                                    placeholder="Enter The Amount"
                                    className="Addfunds-amountInput"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        {selectedMethod && selectedMethod.client_fields && selectedMethod.client_fields.length > 0 && (
                            selectedMethod.client_fields.map((field) => (
                                <div className="Addfunds-inputWrapperaddfunds" key={field.id}>
                                    <label
                                        htmlFor={field.name[locale]}
                                        className="Addfunds-label"
                                    >
                                        {field.name[locale] || field.name['en']}
                                    </label>
                                    {field.type === 'text' && (
                                        <input 
                                            id={field.name['en']} 
                                            type="text" 
                                            required={field.required} 
                                            className="Addfunds-textInput"
                                        />
                                    )}
                                    {field.type === 'number' && (
                                        <input 
                                            id={field.name['en']} 
                                            type="number" 
                                            required={field.required} 
                                            className="Addfunds-numberInput"
                                        />
                                    )}
                                    {field.type === 'image' && (
                                        <input
                                            type="file"
                                            name={field.name['en']}
                                            className="Addfunds-fileInput"
                                            onChange={(e) => handleAttachmentChange(e.target.files[0], field.name['en'])}
                                            required={field.required}
                                        />
                                    )}
                                </div>
                            ))
                        )}
                        <div className="Addfunds-row">
                            <div className="Addfunds-column">
                                <label className="Addfunds-label">Fees</label>
                                <div className="Addfunds-inputWithCurrency">
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className="Addfunds-inputSmall"
                                        value={charge}
                                    />
                                    <span className="Addfunds-currency">EGP</span>
                                </div>
                            </div>
                            <div className="Addfunds-column">
                                <label className="Addfunds-label">Vat</label>
                                <div className="Addfunds-inputWithCurrency">
                                    <input
                                        type="text"
                                        placeholder="0"
                                        className="Addfunds-inputSmall"
                                        value={vat}
                                        disabled
                                    />
                                    <span className="Addfunds-currency">EGP</span>
                                </div>
                            </div>
                        </div>
                        <div className="Addfunds-totalContainer">
                            <h2 className="Addfunds-totalLabel">Total</h2>
                            <h3 className="Addfunds-totalValue">{total} EGP</h3>
                        </div>
                        {selectedMethod &&
                                selectedMethod.attachment !== false &&
                        <div className="Addfunds-inputWrapperaddfunds">
                            <label className="Addfunds-label">
                                Uploading the file
                            </label>
                            <div className="Addfunds-fileUpload">
                                <span className="Addfunds-uploadText">
                                    Attach The File
                                </span>
                                <input
                                    type="file"
                                    className="Addfunds-fileInput"
                                    onChange={(e) => handleAttachmentChange(e.target.files[0], "attachment")}
                                />
                            </div>
                            {attachment && attachment["attachment"] && (
                                <div className="Addfunds-previewContainer">
                                    <img
                                        src={attachment["attachment"].preview}
                                        alt="Preview"
                                        className="Addfunds-previewImage"
                                    />
                                    <button
                                        className="Addfunds-removeButton"
                                        onClick={() => handleRemoveAttachment("attachment")}
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                        }
                        <div className="Addfunds-buttonContainer">
                            <button
                                type="submit"
                                className={`Addfunds-sendButton ${isSendButtonHovered ? 'Addfunds-sendButtonHover' : ''}`}
                                onMouseEnter={() => setIsSendButtonHovered(true)}
                                onMouseLeave={() => setIsSendButtonHovered(false)}
                                onClick={onSubmit}
                            >
                                Send
                            </button>
                            <button
                                type="button"
                                className={`Addfunds-cancelButton ${isCancelButtonHovered ? 'Addfunds-cancelButtonHover' : ''}`}
                                onMouseEnter={() => setIsCancelButtonHovered(true)}
                                onMouseLeave={() => setIsCancelButtonHovered(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                    <div className="Addfunds-logosContainer">
                        <img src={orangee} alt="Logo 1" className="Addfunds-logo" />
                        <img src={weeee} alt="Logo 2" className="Addfunds-logo" />
                        <img src={insta} alt="Logo 3" className="Addfunds-logo" />
                        <img src={vode} alt="Logo 4" className="Addfunds-logo" />
                        <img src={bankk} alt="Logo 5" className="Addfunds-logo" />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AddFunds;
