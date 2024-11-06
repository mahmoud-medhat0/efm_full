import React, { useState } from "react";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";
import { translate } from "../../../utils/functions";
import DashboardLayout from "../Layout";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";

const Currencies = () => {
    const { lang :locale } = usePage().props;
    const { currencies } = usePage().props;
    const [amount, setAmount] = useState(0);
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [exchangeRate, setExchangeRate] = useState(currencies[0].exchange_rate); // Assume 1 for simplicity

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleCurrencyChange = (e) => {
        const currency = currencies.find(c => c.id === e.target.value);
        setSelectedCurrency(currency);
        // Assume a function to fetch exchange rate
        setExchangeRate(currency.exchange_rate);
    };


    const calculateResult = () => {
        return parseFloat(amount * exchangeRate).toFixed(2);
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-4 pt-20 ">
                <WelcomeTab />
                <div className="w-full px-2 py-12 sm:px-0 bg-white rounded-md">
                    <h3 className="text-lg mb-5">{translate('Currencies')}</h3>
                    <form className="flex flex-col gap-4 border p-4 rounded-md">
                        <div className="flex flex-col gap-4">
                            <label className="text-sm font-bold">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder={translate('Enter amount')}
                                className="p-2 border"
                            />
                            <label className="text-sm font-bold">Currency</label>
                            <select
                                value={selectedCurrency.id}
                                onChange={handleCurrencyChange}
                                className="p-2 border rounded-md"
                            >
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                    {currency.name['en']}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-4"></div>
                        <div className="text-lg font-bold">
                            {translate('Exchange Rate')}: {exchangeRate}
                        </div>
                        <div className="text-lg font-bold">
                            {translate('Result')}: {calculateResult()}
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Currencies;