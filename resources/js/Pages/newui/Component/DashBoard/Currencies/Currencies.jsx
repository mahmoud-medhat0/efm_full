
import { useState } from "react";
import mony from "../../../photo/mony.svg";
import orangee from "../../../photo/orange.svg";
import weeee from "../../../photo/we pay.svg";
import insta from "../../../photo/انستباي.svg";
import vode from "../../../photo/vodefone.svg";
import bankk from "../../../photo/banx.svg";
import upgred from "../../../photo/upgreed.svg";
import { usePage } from "@inertiajs/inertia-react";
import DashboardLayout from '../../../Layout/DashboardLayout';
const Currencies = () => {
    const { lang: locale } = usePage().props;
    const { currencies,auth } = usePage().props;
    const [currency, setCurrency] = useState(currencies[0]);
    const [amount, setAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(
        currencies[0].exchange_rate
    );

    const calculateResult = () => {
        return parseFloat(amount * exchangeRate).toFixed(2);
    };

    const result = calculateResult();

    const handleCurrencyChange = (e) => {
        const currency = currencies.find((c) => c.id === e.target.value);
        setSelectedCurrency(currency);
        setExchangeRate(currency.exchange_rate);
    };
    return (
        <DashboardLayout>
            <div className="Currencies-currencies-container">
                <h1 className="Currencies-title">Currencies</h1>
                <div className="Currencies-card">
                <div className="Currencies-header">
                    <div className="Currencies-logo-container">
                      
                        <span
                        className="Currencies-result"
                         
                        >
                            Result
                        </span>
                    </div>
                    <div className="Currencies-exchange-rate">
                        <span style={{ color: "#DFBC8A" ,fontSize:"20px" }}>Exchange Rate</span>
                    </div>
                </div>

                <div className="Currencies-TOTALRESULT">
                    <h2 className="Currencies-result">{calculateResult()} {currency.name[locale]}</h2>
                    <h3 className="Currencies-money">EGP {exchangeRate}</h3>
                </div>

                <div className="Currencies-balance">
                    <span style={{fontSize:"16px"}}>Current balance</span>
                    <span>{auth.client.balance} EGP</span>
                </div>
                <div className="Currencies-input-group">
                    <label style={{ color: "#DFBC8A" }}>Amount</label>
                    <div className="Currencies-input-with-icon">
                        <img src={mony} alt="Currency Icon" />
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                        />
                        <span className="Currencies-input-currency">{currency.name[locale]}</span>
                    </div>
                </div>

                <div className="Currencies-input-group">
                    <label style={{ color: "#DFBC8A" }}>Currency</label>
                    <div className="Currencies-select-container">
                        <select
                            value={currency.id}
                            onChange={handleCurrencyChange}
                        >
                            {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                    {currency.name[locale]}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <footer className="Currencies-footer-logos">
                    <img src={orangee} alt="Orange" />
                    <img src={weeee} alt="WePay" />
                    <img src={insta} alt="InstaPay" />
                    <img src={vode} alt="Vodafone" />
                    <img src={bankk} alt="Banque Misr" />
                </footer>
            </div>
            </div>
        </DashboardLayout>
    );
};

export default Currencies;
