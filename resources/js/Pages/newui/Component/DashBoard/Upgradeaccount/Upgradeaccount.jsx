import upgredacountstyles from "./Upgradeaccount.module.css";
import upgred from "../../../photo/upgreed.svg";
import orangee from "../../../photo/orange.svg";
import weeee from "../../../photo/we pay.svg";
import insta from "../../../photo/انستباي.svg";
import vode from "../../../photo/vodefone.svg";
import bankk from "../../../photo/banx.svg";
import moneychack from "../../../photo/money-check 1.svg";
import DashboardLayout from "../../../Layout/DashboardLayout";
import { usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useSelector } from "react-redux";
const UpgradeAccount = () => {
    const page = usePage();
    const methods = page.props.methods;
    const plans = page.props.plans;
    const [selectedPlan, setSelectedPlan] = useState(plans[0]);
    return (
        <DashboardLayout>
            <h2 className={upgredacountstyles.upgradeTitle}>Upgrade Account</h2>

            <div className={upgredacountstyles.upgradeContainer}>
                <div className={upgredacountstyles.accountBalance}>
                    <div className={upgredacountstyles.balanceInfo}>
                        <span className={upgredacountstyles.balanceLabel}>
                            Current Balance
                        </span>
                        <span className={upgredacountstyles.balanceAmount}>
                            {page.props.auth.client.balance} EGP
                        </span>
                    </div>
                    <img
                        src={upgred}
                        alt="Balance Icon"
                        className={upgredacountstyles.logoUpgrade}
                    />
                    <div className={upgredacountstyles.balanceDate}>
                        Date: {new Date().toLocaleDateString()}
                    </div>
                </div>

                <form className={upgredacountstyles.upgradeForm} onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await axios.post(route('client.dashboard.membership.upgrade.balance'), {
                        _method: 'POST',
                        plan: selectedPlan.id,
                    });
                    if(response.data.success){
                        toast.success('Membership upgraded successfully',{
                            duration: 2000,
                            position: 'top-right',
                        });
                        setTimeout(() => {
                            Inertia.reload();
                        }, 2000);
                    }else{
                        toast.error(response.data.message,{
                            duration: 5000,
                            position: 'top-right',
                        });
                    }
                }}>
                    <label className={upgredacountstyles.formLabel}>
                        Select Payment
                    </label>
                    <div className={upgredacountstyles.selectContainer}>
                        <div className={upgredacountstyles.selectWrapper}>
                            <img
                                className={upgredacountstyles.selectIcon}
                                src={moneychack}
                                alt="icon"
                            />
                            <select className={upgredacountstyles.formInput}>
                                <option>Upgrade Using Balance</option>
                            </select>
                        </div>
                    </div>

                    <label className={upgredacountstyles.formLabel}>Plan</label>
                    <div className={upgredacountstyles.selectContainer}>
                        <select className={upgredacountstyles.formInput}>
                            {plans.map((plan) => (
                                <option key={plan.id}>{plan.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* الأزرار */}
                    <div className={upgredacountstyles.buttonsContainer}>
                        <button className={upgredacountstyles.upgradeButton}>
                            Upgrade
                        </button>
                        <button className={upgredacountstyles.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>

                {/* الشعارات */}
                <div className={upgredacountstyles.paymentLogos}>
                    <img src={orangee} alt="Logo 1" />
                    <img src={weeee} alt="Logo 2" />
                    <img src={insta} alt="Logo 3" />
                    <img src={vode} alt="Logo 3" />
                    <img src={bankk} alt="Logo 3" />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpgradeAccount;
