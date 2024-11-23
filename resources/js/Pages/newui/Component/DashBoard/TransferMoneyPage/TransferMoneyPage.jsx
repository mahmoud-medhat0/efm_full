import "./TransferMoneyPage.css";
import iconess5 from "../../../photo/amount task.svg";
import iconess6 from "../../../photo/clienttitel.svg";
import orangee from "../../../photo/orange.svg";
import weeee from "../../../photo/we pay.svg";
import insta from "../../../photo/انستباي.svg";
import vode from "../../../photo/vodefone.svg";
import bankk from "../../../photo/banx.svg";
import ETSLIAT from "../../../photo/ETSLIT.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-hot-toast";
import { route } from "ziggy-js";
function TransferMoneyPage() {
    const [client, setClient] = useState("");
    const [amount, setAmount] = useState("0");
    const submit = async () => {
        const response = await axios.post(route("client.dashboard.transfer-money.post"), {
            client,
            amount,
        });
        if (response.data.success) {
            toast.success(response.data.message);
            setClient("");
            setAmount("0");
            Inertia.visit(route("client.dashboard.logs.transaction"));
        } else {
            toast.error(response.data.message);
        }
    };
    return (
        <DashboardLayout>
            <div className="TransferMoneyPage-container">
                <div className="TransferMoneyPage-header">
                    <span className="TransferMoneyPage-title">
                        Transfer Money
                    </span>
                </div>

                <div className="TransferMoneyPage-card">
                    <form className="TransferMoneyPage-form">
                        <div className="TransferMoneyPage-inputWrapper">
                            <label className="TransferMoneyPage-label">
                                client
                            </label>
                            <img
                                src={iconess6}
                                alt="client icon"
                                className="TransferMoneyPage-inputIcon"
                            />
                            <input
                                type="text"
                                placeholder="Enter The Username Or Email"
                                className="TransferMoneyPage-input"
                                value={client}
                                onChange={(e) => setClient(e.target.value)}
                                onInput={(e) => setClient(e.target.value)}
                            />
                        </div>

                        <div className="TransferMoneyPage-inputWrapper">
                            <label className="TransferMoneyPage-label">
                                Amount
                            </label>
                            <img
                                src={iconess5}
                                alt="amount icon"
                                className="TransferMoneyPage-inputIcon"
                            />
                            <input
                                type="text"
                                placeholder="Enter The Amount"
                                className="TransferMoneyPage-input"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                onInput={(e) => setAmount(e.target.value)}
                            />
                        </div>

                        <div className="TransferMoneyPage-buttonGroup">
                            <button
                                type="button"
                                className="TransferMoneyPage-sendButton"
                                onClick={submit}
                            >
                                Send
                            </button>
                            <button
                                type="button"
                                className="TransferMoneyPage-cancelButton"
                                onClick={() => Inertia.visit(route("client.dashboard"))}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>

                    <div className="TransferMoneyPage-logos">
                        <img
                            src={orangee}
                            alt="logo1"
                            className="TransferMoneyPage-logoSmall"
                        />
                        <img
                            src={weeee}
                            alt="logo2"
                            className="TransferMoneyPage-logoSmall"
                        />
                        <img
                            src={insta}
                            alt="logo3"
                            className="TransferMoneyPage-logoSmall"
                        />
                        <img
                            src={vode}
                            alt="logo3"
                            className="TransferMoneyPage-logoSmall"
                        />
                        <img
                            src={bankk}
                            alt="logo3"
                            className="TransferMoneyPage-logoSmall"
                        />
                        <img
                            src={ETSLIAT}
                            alt="logo3"
                            className="TransferMoneyPage-logoSmall"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default TransferMoneyPage;
