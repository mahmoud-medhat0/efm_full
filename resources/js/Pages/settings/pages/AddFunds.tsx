import MethodSelector from "../../../components/dashboard/membships/MethodSelector";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import Button from "../../../components/schema/Button";
import Input from "../../../components/schema/Input";
import RootLayout from "../Layout";
import { usePage } from "@inertiajs/inertia-react";
import { useState, useEffect } from "react";
import FileUpload from "../../../components/schema/dropify";
import axios from "axios";
import { route } from "ziggy-js"; // Added import for route
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Inertia } from "@inertiajs/inertia";
import { translate } from "../../../utils/functions";

const AddFundsPage = () => {
    const page = usePage();
    const methods = page.props.methods;
    const { lang: locale, app_url } = usePage().props;
    const customer = page.props.auth.client;
    const [selectedMethod, setSelectedMethod] = useState(methods[0]);
    const [amount, setAmount] = useState("");
    const [total, setTotal] = useState(0);
    const [attachment, setAttachment] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [vat, setVat] = useState(0);
    const [charge, setCharge] = useState(0);
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
                vat =
                    (parseFloat(amount) * selectedMethod.vat_deposit) / 100;
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

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        setAmount(value);
    };

    const handleAttachmentChange = (file, fieldName) => {
        setAttachment((prevAttachments) => ({
            ...prevAttachments,
            [fieldName]: file,
        }));
    };
    const handleMethodChange = (method) => {
        setSelectedMethod(method);
        if (method.client_fields && method.client_fields.length > 0) {
            method.client_fields.forEach((field) => {
                if (field.type === 'image') {
                }
            });
        }
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
    }, [amount, selectedMethod]); // Recalculate total when amount or selectedMethod changes
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (e) => {
        setIsLoading(true);
        try {
            if (selectedMethod.auto) {
                const script = document.createElement("script");
                script.src =
                    "https://staging.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
                document.body.appendChild(script);

                script.onload = () => {
                    // Create a modal container
                    const modal = document.createElement("div");
                    modal.id = "fawaterkModal";
                    modal.style.position = "fixed";
                    modal.style.top = "0";
                    modal.style.left = "0";
                    modal.style.width = "100%";
                    modal.style.height = "100%";
                    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                    modal.style.display = "flex";
                    modal.style.alignItems = "center";
                    modal.style.justifyContent = "center";
                    modal.style.zIndex = "1000";

                    // Create a content container for the iframe
                    const content = document.createElement("div");
                    content.style.backgroundColor = "white";
                    content.style.padding = "20px";
                    content.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                    content.style.width = "80%";
                    content.style.height = "80%";
                    content.style.overflow = "auto";

                    // Append the content container to the modal
                    modal.appendChild(content);
                    document.body.appendChild(modal);

                    // Set the fawaterkDivId to the content container
                    const fawaterkDiv = document.createElement("div");
                    fawaterkDiv.id = "fawaterkDivId";
                    content.appendChild(fawaterkDiv);

                    setIsLoading(false);

                    const pluginConfig = {
                        envType: "test",
                        hashKey: page.props.hash,
                        style: {
                            listing: "horizontal",
                        },
                        requestBody: {
                            cartTotal: total.toFixed(2),
                            currency: "EGP",
                            customer: {
                                customer_unique_id: customer.id,
                                first_name: customer.name.split(" ")[0],
                                last_name: customer.name.split(" ")[1],
                                email: customer.email,
                                phone: customer.phone,
                            },
                            redirectionUrls: {
                                successUrl: "https://56c7-196-133-114-138.ngrok-free.app/dashboard/logs/deposit",
                                // failUrl: "https://56c7-196-133-114-138.ngrok-free.app/dashboard/logs/deposit",
                                pendingUrl: "https://56c7-196-133-114-138.ngrok-free.app/dashboard/logs/deposit",
                                // cancelUrl: "https://56c7-196-133-114-138.ngrok-free.app/dashboard/logs/deposit",
                            },
                            cartItems: [
                                {
                                    name: "Deposit - " + customer.name,
                                    price: total.toFixed(2),
                                    quantity: "1",
                                },
                            ],
                            payLoad: {
                                client_id: customer.id,
                                amount: amount.toFixed(2),
                                total: total.toFixed(2),
                                payment_method: selectedMethod.id,
                                fee: charge.toFixed(2) + vat.toFixed(2),
                            },
                        },
                    };
                    window.pluginConfig = pluginConfig;
                    if (typeof window.fawaterkCheckout !== "undefined") {
                        console.log("Fawaterk plugin loaded successfully.");
                        window.fawaterkCheckout(pluginConfig);
                    } else {
                        console.error("fawaterkCheckout is not defined.");
                    }
                };
                return;
            } else {
                if (!selectedMethod) {
                    setIsLoading(false);
                    toast.error("Please select a Deposit method");
                    return;
                }
                if (amount <= 0) {
                    setIsLoading(false);
                    toast.error("Please enter an amount");
                    return;
                }
                console.log(attachment);
                if (selectedMethod.attachment && attachment["attachment"]=== undefined) {
                    setIsLoading(false);
                    toast.error("Please upload an image");
                    return;
                }

                const formData = new FormData();
                formData.append("selectedMethod", selectedMethod.id);
                formData.append("amount", amount);
                formData.append("attachment", attachment["attachment"]);
                if (selectedMethod.client_fields && selectedMethod.client_fields.length > 0) {
                  selectedMethod.client_fields.forEach((field) => {
                      if (field.type === 'image') {
                        if (attachment[field.name['en']] !== undefined) {
                            formData.append(field.name['en'], attachment[field.name['en']]);
                        } else {
                            setIsLoading(false);
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
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content"),
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
                        response.data.message +
                            " with transaction id: " +
                            response.data.tnx
                    );
                    setTimeout(() => {
                        Inertia.visit(route("client.dashboard"));
                    }, 1000);
                } else {
                  if (response.data.errors) {
                    Object.keys(response.data.errors).forEach((key) => {
                        response.data.errors[key].forEach(
                            (errorMsg: string) => {
                                toast.error(errorMsg, {
                                    position: "bottom-center",
                                    duration: 2000,
                                });
                            }
                        );
                    });
                  } else {
                    toast.error(response.data.message, {
                      position: "top-center",
                      duration: 2000,
                    });
                  }
                }
            }
        } catch (error) {
            toast.error("Error submitting form:" + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RootLayout>
            <div>
                <WelcomeTab />
                <div className="w-full px-2 py-12 sm:px-0" style={{direction: locale === 'ar' ? 'rtl' : 'ltr'}}>
                    <h3 className="text-lg mb-5">{translate('Add funds')}</h3>
                    {selectedMethod &&
                        selectedMethod.description_deposit != null &&
                        selectedMethod.description_deposit != "" && (
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="description"
                                    className="text-black text-base flex items-center"
                                >
                                    {translate('Description')}
                                    <button
                                        onClick={copyToClipboard}
                                        className="ml-2 bg-primary-700 text-white rounded-md hover:bg-primary-800 flex items-center justify-center"
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                        }} // Adjusted size
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="#000000"
                                            height="25px"
                                            width="30px"
                                            version="1.1"
                                            id="Capa_1"
                                            viewBox="0 0 512 350"
                                            xmlSpace="preserve"
                                        >
                                            <g>
                                                <path d="M35,270h45v45c0,8.284,6.716,15,15,15h200c8.284,0,15-6.716,15-15V75c0-8.284-6.716-15-15-15h-45V15   c0-8.284-6.716-15-15-15H35c-8.284,0-15,6.716-15,15v240C20,263.284,26.716,270,35,270z M280,300H110V90h170V300z M50,30h170v30H95   c-8.284,0-15,6.716-15,15v165H50V30z" />
                                                <path d="M155,120c-8.284,0-15,6.716-15,15s6.716,15,15,15h80c8.284,0,15-6.716,15-15s-6.716-15-15-15H155z" />
                                                <path d="M235,180h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15S243.284,180,235,180z" />
                                                <path d="M235,240h-80c-8.284,0-15,6.716-15,15c0,8.284,6.716,15,15,15h80c8.284,0,15-6.716,15-15C250,246.716,243.284,240,235,240z   " />
                                            </g>
                                        </svg>
                                    </button>
                                </label>
                                <div
                                    id="description"
                                    style={{
                                        border: "3px solid black",
                                        backgroundColor: "white",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: selectedMethod.description_deposit,
                                    }}
                                />
                            </div>
                        )}
                    <div className="pb-3">
                        <form
                            className="space-y-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="plan"
                                    className="text-black text-base"
                                >
                                    {translate('Method')}
                                </label>
                                {methods.length > 0 && (
                                    <MethodSelector
                                        methods={methods}
                                        onChange={handleMethodChange}
                                    />
                                )}
                            </div>
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="amount"
                                    className="text-black text-base"
                                >
                                    {translate('Amount')}
                                </label>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    onInput={handleAmountChange}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            calcTotal();
                                        } else {
                                            calcTotal();
                                        }
                                    }}
                                />
                            </div>
                            {selectedMethod &&
                                selectedMethod.attachment !== false && (
                                    <div className="space-y-2 pb-1">
                                        <FileUpload
                                            inputName="attachment"
                                            allowedExtensions={["jpg", "png", "jpeg"]}
                                            onFileSelect={(file) => handleAttachmentChange(file, "attachment")}
                                        />
                                    </div>
                            )}
                            {selectedMethod && selectedMethod.client_fields && selectedMethod.client_fields.length > 0 && (
                              selectedMethod.client_fields.map((field) => (
                                <div className="space-y-2 pb-1" key={field.id}>
                                  <label
                                    htmlFor={field.name[locale]}
                                    className="text-black text-base"
                                  >
                                    {field.name[locale] || field.name['en']}
                                  </label>
                                  {field.type === 'text' && (
                                    <Input id={field.name['en']} type="text" required={field.required} />
                                  )}
                                  {field.type === 'number' && (
                                    <Input id={field.name['en']} type="number" required={field.required} />
                                  )}
                                  {field.type === 'image' && (
                                    <FileUpload
                                      inputName={field.name['en']}
                                      allowedExtensions={['jpg', 'png', 'jpeg']}
                                      required={field.required}
                                      onFileSelect={(file) => handleAttachmentChange(file, field.name['en'])}
                                    />
                                  )}
                                </div>
                              ))
                            )}
                              <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="charge"
                                    className="text-black text-base"
                                >
                                    {translate('Charge')}
                                </label>
                                <Input id="charge" value={charge.toFixed(2)} readOnly />
                              </div>
                              <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="vat"
                                    className="text-black text-base"
                                >
                                    {translate('VAT')}
                                </label>
                                <Input id="vat" value={vat.toFixed(2)} readOnly />
                              </div>
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="total"
                                    className="text-black text-base"
                                >
                                    {translate('Total')}
                                </label>
                                <Input
                                    id="total"
                                    value={total.toFixed(2)}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row gap-3">
                                <Button fullWidth isLoading={isLoading}>
                                    {translate('Submit')}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </RootLayout>
    );
};

export default AddFundsPage;
