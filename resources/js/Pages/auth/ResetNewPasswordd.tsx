import React, { useState } from 'react';
import RootLayout from "../../layout";
import { RESET_NEW_PASSWORD_FORM } from "../../data";
import { translate } from '../../utils/functions';
import Input from '../../components/schema/Input';
import { yupResolver } from "@hookform/resolvers/yup";
import { resetSchema } from "../../validation";
import { useForm } from "react-hook-form";
import Button from '../../components/schema/Button';
import { usePage } from "@inertiajs/inertia-react";
import axios from 'axios';
import { route } from 'ziggy-js';
import toast from 'react-hot-toast';
import { Inertia } from "@inertiajs/inertia";
interface IFormInput {
    password: string;
    password_confirmation: string;
}

const ResetNewPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { token, email } = usePage().props;
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await axios.post(route('password.reset.post'), {
            token: token,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        });
        if (response.data.success) {
            toast.success(response.data.message);
            setTimeout(() => {
                Inertia.visit(route('client.login'));
            }, 1000);
        } else {
            toast.error(response.data.message);
        }
    };
    const {
        register,
        formState: { errors },
      } = useForm<IFormInput>({
        resolver: yupResolver(resetSchema),
      });
    const renderResetNewPasswordForm = RESET_NEW_PASSWORD_FORM.map(({name, placeholder, type, forl, placel, validation}, idx) => {
        const translatedPlacel = translate(placel.replace("..", "").trim());
        const translatedPlaceholder = translate(placeholder.replace("..", "").trim());
        return (
            <div key={idx}>
                <div className="space-y-2 pb-1">
                    <label htmlFor={forl} className="text-black text-xl">{translatedPlacel}</label>
                    <Input
                        id={forl}
                        type={type}
                        placeholder={translatedPlaceholder}
                        {...register(name, validation)}
                        onChange={(e) => {
                            if (name === 'password') {
                                setPassword(e.target.value);
                            } else {
                                setConfirmPassword(e.target.value);
                            }
                        }}
                    />
                </div>
            </div>
        );
    });

    return (
        <RootLayout>
            <section className="w-[800px] my-24 mx-auto max-sm:w-full max-sm:px-3 pt-20">
                <div className="space-y-2 pb-1">
                    <h2>{translate("Reset New Password")}</h2>
                    <form onSubmit={handleSubmit}>
                        {renderResetNewPasswordForm}
                        <Button fullWidth isLoading={isLoading}>
                            {translate("Reset Password")}
                        </Button>
                    </form>
                </div>
            </section>
        </RootLayout>
    );
}

export default ResetNewPasswordPage;
