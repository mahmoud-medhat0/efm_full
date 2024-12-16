
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
    const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
    return (
        <DashboardLayout>
            <h2 className="UpgradeAccount-upgradeTitle">Upgrade Account</h2>

            <div className="UpgradeAccount-upgradeContainer">
                <div className="UpgradeAccount-accountBalance">
                    <div className="UpgradeAccount-balanceInfo">
                        <span className="UpgradeAccount-balanceLabel">
                            Current Balance
                        </span>
                        <span className="UpgradeAccount-balanceAmount">
                            {page.props.auth.client.balance} EGP
                        </span>
                    </div>
                    <img
                        src={upgred}
                        alt="Balance Icon"
                        className="UpgradeAccount-logoUpgrade"
                    />
                    <div className="UpgradeAccount-balanceDate">
                        Date: {new Date().toLocaleDateString()}
                    </div>
                </div>

                <form className="UpgradeAccount-upgradeForm" onSubmit={async (e) => {
                    e.preventDefault();
                    const response = await axios.post(route('client.dashboard.membership.upgrade.balance'), {
                        _method: 'POST',
                        plan: selectedPlan,
                    });
                    if(response.data.success){
                        toast.success('Membership upgraded successfully',{
                            duration: 2000,
                            position: 'top-right',
                        });
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    }else{
                        toast.error(response.data.message,{
                            duration: 5000,
                            position: 'top-right',
                        });
                    }
                }}>
                    <label className="UpgradeAccount-formLabel">
                        Select Payment
                    </label>
                    <div className="UpgradeAccount-selectContainer">
                        <div className="UpgradeAccount-selectWrapper">
                            <img
                                className="UpgradeAccount-selectIcon"
                                src={moneychack}
                                alt="icon"
                            />
                            <select className="UpgradeAccount-formInput">
                                <option>Upgrade Using Balance</option>
                            </select>
                        </div>
                    </div>

                    <label className="UpgradeAccount-formLabel">Plan</label>
                    <div className="UpgradeAccount-selectContainer">
                        <select className="UpgradeAccount-formInput" onChange={(e) => setSelectedPlan(e.target.value)}>
                            {plans.map((plan) => (
                                <option key={plan.id} value={plan.id}>{plan.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* الأزرار */}
                    <div className="UpgradeAccount-buttonsContainer">
                        <button className="UpgradeAccount-upgradeButton">
                            Upgrade
                        </button>
                        <button className="UpgradeAccount-cancelButton">
                            Cancel
                        </button>
                    </div>
                </form>

                {/* الشعارات */}
                <div className="UpgradeAccount-paymentLogos">
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
