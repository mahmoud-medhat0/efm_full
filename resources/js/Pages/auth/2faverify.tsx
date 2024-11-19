import React, { useState } from 'react';
import axios from 'axios';
import RootLayout from "../../layout";
import { route } from 'ziggy-js';
import toast from 'react-hot-toast';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import Button from "../../components/schema/Button";
import { Inertia } from '@inertiajs/inertia';

const TwoFactorAuthenticationVerify = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await axios.post(route('client.2fa.post'), { code });
        if (response.data.success) {
            setIsLoading(false);
            toast.success('2FA successful! Redirecting in 2 seconds...',{
                duration: 4000,
                position: "top-center",
            });
            setTimeout(() => {
                Inertia.visit(route('client.dashboard.dashboard'));
            }, 2000);
        } else {
            setError(response.data.message);
            toast.error(response.data.message,{
                duration: 4000,
                position: "top-center",
            });
        }
        setIsLoading(false);
    };

    return (
        <RootLayout>
            <div className="container mx-auto mt-10">
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Two-Factor Authentication</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="2fa_code" className="block text-gray-700 font-medium">2FA Code</label>
                            <div className="relative mt-2">
                                <input
                                    type="text"
                                    id="2fa_code"
                                    name="2fa_code"
                                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none pl-10 pr-4 py-2"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    required
                                />
                                <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            </div>
                        </div>
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}
                        <div className="flex justify-center">
                            <Button
                                type="submit"
                                fullWidth
                                isLoading={isLoading}
                            >
                                Verify
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </RootLayout>
    );
};

export default TwoFactorAuthenticationVerify;
