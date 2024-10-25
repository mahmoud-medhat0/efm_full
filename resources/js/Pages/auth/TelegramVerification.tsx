/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-constant-condition */
import { Link } from "@inertiajs/inertia-react";
import Button from "../../components/schema/Button";
import { useState } from "react";
import Input from "../../components/schema/Input";
import { TELEGRAM_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../../components/InputErrorMessage";
import { SubmitHandler, useForm } from "react-hook-form";
import { modalSchema, telegramSchema } from "../../validation";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import Modal from "../../components/schema/Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import RootLayout from "../../layout";
import { route } from "ziggy-js";
// Define interfaces
interface IFormInput {
    code: string;
}

interface IModalInput {
    id: string;
    username: string;
}

const AuthTelegramPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [modalFormData, setModalFormData] = useState<IModalInput>({ id: "", username: "" });

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // ** React Hook Form for Telegram Login
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        resolver: yupResolver(telegramSchema),
    });

    // ** React Hook Form for Modal
    const {
        register: registerModal,
        handleSubmit: handleSubmitModal,
        setError,
        formState: { errors: modalErrors },
    } = useForm<IModalInput>({
        resolver: yupResolver(modalSchema),
    });

    // ** Handlers
    const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
        setIsLoading(true);
        try {
            const { status, data: resData } = await axios.post(
                route("client.telegram-verify.post"),
                data
            );
            if (status === 200 && resData.success==true) {
                toast.success(resData.message, {
                    position: "bottom-center",
                    duration: 4000,
                });
                setTimeout(() => {
                    window.location.replace("/");
                }, 2000);
            }
            else if(status === 200 && resData.success==false){
                toast.error(resData.errors.code, {
                    position: "bottom-center",
                    duration: 4000,
                });
            }
        } catch (error) {
            const errorObj = error as AxiosError<IErrorResponse>;
            const message =
                errorObj.response?.data.error.details?.message ||
                errorObj.response?.data.message;
            toast.error(`Login failed: ${message}`, {
                position: "bottom-center",
                duration: 1500,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmitModal: SubmitHandler<IModalInput> = async (data: IModalInput) => {
        try {
            const response = await axios.post(route("client.telegram-send"), data);
            if ((response.status === 200 || response.status === 201) && response.data.success) {
                toast.success(response.data.message, {
                    position: "bottom-center",
                    duration: 2000,
                });
                closeModal();
            } else if (response.data.success === false) {
                if (response.data.errors) {
                    Object.keys(response.data.errors).forEach((key) => {
                        response.data.errors[key].forEach((errorMsg: string) => {
                            toast.error(errorMsg, {
                                position: "bottom-center",
                                duration: 2000,
                            });
                        });
                    });
                } else {
                    toast.error(response.data.message || "An error occurred", {
                        position: "bottom-center",
                        duration: 2000,
                    });
                }
            } else {
                toast.error(response.data.message || "An error occurred", {
                    position: "bottom-center",
                    duration: 2000,
                });
            }
        } catch (error) {
            console.error('Error during Telegram verification:', error);
            const errorObj = error as AxiosError<IErrorResponse>;
            const message =
                errorObj.response?.data.error?.details?.message ||
                errorObj.response?.data.message ||
                "An error occurred during verification";
            toast.error(`Verification failed: ${message}`, {
                position: "bottom-center",
                duration: 3000,
            });
        }
        setModalFormData(data);
    };

    // ** Renders
    const renderTelegramForm = TELEGRAM_FORM.map(
        ({ name, placeholder, type, forl, placel, validation }, idx) => (
            <div key={idx}>
                <div className="space-y-2 pb-1">
                    <label htmlFor={forl} className="text-black text-xl">
                        {placel}
                    </label>
                    <Input
                        id={forl}
                        type={type}
                        placeholder={placeholder}
                        {...register(name, validation)}
                    />
                </div>
                {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
            </div>
        )
    );

    return (
        <RootLayout>
        <section className="w-[800px] my-20 mx-auto">
            <h2 className="text-black text-2xl pb-6">
                Verify Telegram Account with <span className="text-primary">EFM</span>hub.com
            </h2>
            <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full">
                    <div className="alert h4 text-left" role="alert">
                        Please make sure you have started a conversation with our{' '}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://t.me/EFMhub_OFFICIAL_bot"
                            className="text-primary hover:underline"
                        >
                            Telegram bot
                        </a>{' '}
                        before registering.
                        <br />
                    </div>
                </div>
            </div>
            <form
                className="w-[800px] space-y-3 mx-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                {renderTelegramForm}
                <Button fullWidth isLoading={isLoading}>
                    Verify & Login
                </Button>
                <div className="flex flex-col space-y-1">
                    <div className="text-black cursor-pointer" onClick={openModal}>
                        Edit Username?
                        <span className="underline ml-1 text-primary">Click Here!</span>
                    </div>
                    <div
                        className="text-black cursor-pointer"
                        onClick={async () => {
                            try {
                                const response = await axios.post(route("client.telegram-resend"));
                                if (response.data.success) {
                                    toast.success(response.data.message);
                                } else {
                                    toast.error(response.data.message);
                                }
                            } catch (error) {
                                toast.error("An error occurred while resending the verification code.");
                            }
                        }}
                    >
                        Didn't receive a code?
                        <span className="underline ml-1 text-primary">RESEND VERIFICATION CODE!</span>
                    </div>
                </div>
            </form>
            <Modal isOpen={isOpen} closeModal={closeModal}>
                <div className='absolute top-[-20px] right-0'>
                    <div className='bg-[#E8F0F7] rounded-full p-1'>
                        <XMarkIcon className='w-6 h-6 cursor-pointer text-red-600' onClick={closeModal} />
                    </div>
                </div>
                <h2 className="text-black text-2xl font-medium mb-2">
                    Edit Telegram Username
                </h2>
                <form
                    className='flex flex-col items-center justify-center space-y-5 pt-10 px-5'
                    onSubmit={handleSubmitModal(onSubmitModal)}
                >
                    <p className="text-center mt-4">
                        Please confirm access to your telegram username by entering the code provided by <a href="https://t.me/EFMhub_OFFICIAL_bot" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline"><span className="text-primary">EFM</span>hub.com ADMIN BOT</a>.
                    </p>

                    <div className='w-full flex flex-row items-center gap-2 p-2 rounded-lg'>
                        <Input
                            placeholder="Enter your ID"
                            {...registerModal("id")}
                            type="number"
                        />
                        {modalErrors.id && (
                            <div>
                                {Array.isArray(modalErrors.id.message) ? (
                                    modalErrors.id.message.map((msg, idx) => (
                                        <InputErrorMessage key={idx} msg={msg} />
                                    ))
                                ) : (
                                    <InputErrorMessage msg={modalErrors.id.message} />
                                )}
                            </div>
                        )}
                        <Input
                            placeholder="Enter your new username"
                            {...registerModal("username")}
                        />
                        {modalErrors.username && (
                            <div>
                                {Array.isArray(modalErrors.username.message) ? (
                                    modalErrors.username.message.map((msg, idx) => (
                                        <InputErrorMessage key={idx} msg={msg} />
                                    ))
                                ) : (
                                    <InputErrorMessage msg={modalErrors.username.message} />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="w-full">
                        <Button fullWidth>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
        </RootLayout>
    );
};

export default AuthTelegramPage;