import "./Currencies.css";
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
            <div className="currencies-container">
                <h1 className="title">Currencies</h1>
                <div className="card">
                <div className="header">
                    <div className="logo-container">
                      
                        <span
                            style={{
                                textAlign: "center",
                                marginLeft: "0px",
                                color: "#DFBC8A",
                                fontWeight: "bold",
                                fontSize:"20px"
                            }}
                        >
                            Result
                        </span>
                    </div>
                    <div className="exchange-rate">
                        <span style={{ color: "#DFBC8A" ,fontSize:"20px" }}>Exchange Rate</span>
                    </div>
                </div>

                <div className="TOTALRESULT">
                    <h2 className="result">{calculateResult()} {currency.name[locale]}</h2>
                    <h3 className="money">EGP {exchangeRate}</h3>
                </div>

                <div className="balance">
                    <span style={{fontSize:"16px"}}>Current balance</span>
                    <span>{auth.client.balance} EGP</span>
                </div>
                <div className="input-group">
                    <label style={{ color: "#DFBC8A" }}>Amount</label>
                    <div className="input-with-icon">
                        <img src={mony} alt="Currency Icon" />
                        <input
                            type="text"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                        />
                        <span className="input-currency">{currency.name[locale]}</span>
                    </div>
                </div>

                <div className="input-group">
                    <label style={{ color: "#DFBC8A" }}>Currency</label>
                    <div className="select-container">
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

                <footer className="footer-logos">
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
