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

const AddFundsPage = () => {
    const page = usePage();
    const methods = page.props.methods;
    const customer = page.props.auth.client;
    const [selectedMethod, setSelectedMethod] = useState(methods[0]);
    const [amount, setAmount] = useState("");
    const [total, setTotal] = useState(0);
    const [attachment, setAttachment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
                charge = parseFloat(selectedMethod.charge_deposit);
            }

            // Calculate the total by subtracting the charge from the amount
            const calculatedTotal = parseFloat(amount) + charge;

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

    const handleAttachmentChange = (file) => {
        setAttachment(file); // Update the attachment state
    };
    const handleMethodChange = (method) => {
        setSelectedMethod(method);
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
                    "https://app.fawaterk.com/fawaterkPlugin/fawaterkPlugin.min.js";
                script.async = true;
                document.body.appendChild(script);

                script.onload = () => {
                    const fawaterkDiv = document.createElement("div");
                    fawaterkDiv.id = "fawaterkDivId";
                    document.body.appendChild(fawaterkDiv);
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
                                successUrl: "https://dev.fawaterk.com/success",
                                failUrl: "https://dev.fawaterk.com/fail",
                                pendingUrl: "https://dev.fawaterk.com/pending",
                            },
                            cartItems: [
                                {
                                    name: "Deposit",
                                    price: total.toFixed(2),
                                    quantity: "1",
                                },
                            ],
                            payLoad: {
                                custom_field1: "xyz",
                                custom_field2: "xyz2",
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
                if (selectedMethod.attachment && !attachment) {
                    setIsLoading(false);
                    toast.error("Please upload a image");
                    return;
                }
                const formData = new FormData();
                formData.append("selectedMethod", selectedMethod.id);
                formData.append("amount", amount);
                if (attachment) {
                    formData.append("attachment", attachment);
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
                <div className="w-full px-2 py-12 sm:px-0">
                    <h3 className="text-lg mb-5">Add funds</h3>
                    {selectedMethod &&
                        selectedMethod.description_deposit != null &&
                        selectedMethod.description_deposit != "" && (
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="description"
                                    className="text-black text-base flex items-center"
                                >
                                    Description
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
                                    Method
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
                                    Amount
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
                                selectedMethod.attachment != false && (
                                    <div className="space-y-2 pb-1">
                                        <FileUpload
                                            inputName="attachment"
                                            allowedExtensions={[
                                                "jpg",
                                                "png",
                                                "jpeg",
                                            ]}
                                            onFileSelect={
                                                handleAttachmentChange
                                            }
                                        />
                                    </div>
                                )}
                            <div className="space-y-2 pb-1">
                                <label
                                    htmlFor="total"
                                    className="text-black text-base"
                                >
                                    Total
                                </label>
                                <Input
                                    id="total"
                                    value={total.toFixed(2)}
                                    readOnly
                                />
                            </div>
                            <div className="flex flex-row gap-3">
                                <Button fullWidth isLoading={isLoading}>
                                    Submit
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
