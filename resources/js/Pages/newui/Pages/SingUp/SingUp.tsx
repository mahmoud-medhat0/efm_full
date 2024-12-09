import InputErrorMessage from "../../../../components/InputErrorMessage";
import Telegram from "../../photo/telegram.png";
import LinkedIn from "../../photo/linkedin-logo.png";
import face from "../../photo/facebook.png";

import singup from "../../photo/Singup.svg";
import { useState } from "react";
import NavbarAuth from "../../Component/auth/NavbarAuth";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import eyeClosed from "../../photo/eye-closed.svg";
import eyeOpen from "../../photo/eye-open.png";
import { toast } from "react-hot-toast";
import axios from 'axios';
import { route } from 'ziggy-js';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { IErrorResponse } from "../../../../interfaces";
import { Link } from "@inertiajs/inertia-react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from '@inertiajs/inertia';
const SingUp = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);
    const [isLoading, setIsLoading] = useState(false);
    const { referral_code } = usePage().props;

    const onSubmit = async (data, event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
          const requestData = {
            ...data,
            phone,
          };
          
          const resData = await axios.post(
            route('client.register.post'),
            requestData
          );
          if (resData.data.success) {
            toast.success("Register is done, you will navigate after 2 seconds!", {
              position: "bottom-center",
              duration: 4000,
            });
            setTimeout(() => {
              Inertia.visit(route("client.login"));
            }, 1500);
          }
        } catch (error) {
          const errorObj = error as AxiosError<IErrorResponse>;
          const errorMessages = errorObj.response?.data?.errors || ["An unexpected error occurred"];

          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((message) => {
              toast.error(message, {
                position: "top-right",
                duration: 4000,
              });
            });
          } else {
            Object.keys(errorMessages).forEach((key) => {
              toast.error(`${key}: ${errorMessages[key]}`, {
                position: "top-right",
                duration: 4000,
              });
            });
          }
        } finally {
          setIsLoading(false);
        }
      };
      
    return (
        <>
            <div className="login-container">
                <div className="login-left">
                    <p>Welcome back! Please login to your account.</p>
                    <form onSubmit={handleSubmit(onSubmit)} className="login-form-container">
                        <div className="input-group">
                            <input type="text" placeholder="FirstName" {...register("first_name")} className="login-inputfn" />
                            <input type="text" placeholder="LastName" {...register("last_name")} className="login-inputln" />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Username" {...register("username")} className="login-inputun" />
                            <input
                                type="text"
                                placeholder="Telegram username"
                                {...register("telegram")}
                                className="login-inputtg"
                            />
                        </div>
                        <div className="input-group">
                            <div className="space-y-2">
                                <PhoneInput
                                    value={phone}
                                    defaultCountry="eg"
                                    onChange={(phone) => setPhone(phone)}
                                      className="login-inputphone"
                                />
                                {(phone.trim() === "" ||
                                    phone.trim().length <= 2) && (
                                    <InputErrorMessage
                                        msg={"Phone is Required!"}
                                    />
                                )}
                            </div>
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="full-width-input"
                            {...register("email")}
                            className="login-inputemil"
                        />
                        <div className="signup-password-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                                className="login-inputpassword"
                            />
                            <span
                                className="signup-toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <img src={eyeOpen} alt="eye-open" /> : <img src={eyeClosed} alt="eye-closed" />}
                            </span>
                        </div>
                        <div className="signup-password-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Password Confirmation"
                                {...register("password_confirmation")}
                                className="login-inputpassword"
                            />
                            <span
                                className="signup-toggle-password"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <img src={eyeOpen} alt="eye-open" /> : <img src={eyeClosed} alt="eye-closed" />}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Referral Code"
                            className="full-width-input"
                            defaultValue={referral_code}
                            {...register("referral_code")}
                            className="login-inputreferral"
                        />
                        <div className="signup-button-group">
                            <button className="signup2-btn">Sign Up</button>
                            <Link className="login2-btn" href={route("client.login")}>Login</Link>
                        </div>
                    </form>

                    <div className="login-social-icons ">
                        <img src={Telegram} alt="face" className="login-icon" />
                        <img src={face} alt="face" className="login-icon" />
                        <img src={LinkedIn} alt="face" className="login-icon" />
                        <span>@EFM Hub</span>
                    </div>
                </div>

                <div className="login-right">
                    <NavbarAuth />
                    <img src={singup} alt="Referral" className="login-image" />
                </div>
            </div>
        </>
    );
};

export default SingUp;
