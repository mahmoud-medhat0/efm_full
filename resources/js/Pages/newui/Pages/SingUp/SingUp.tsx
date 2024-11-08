import InputErrorMessage from "../../../../components/InputErrorMessage";
import Telegram from "../../photo/telegram.png";
import LinkedIn from "../../photo/linkedin-logo.png";
import face from "../../photo/facebook.png";
import "./SingUp.css";
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

const SingUp = () => {
    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phone, setPhone] = useState("");
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);
    const [isLoading, setIsLoading] = useState(false);

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
                    <form onSubmit={handleSubmit(onSubmit)} className="signup-form-container">
                        <div className="input-group">
                            <input type="text" placeholder="FirstName" {...register("first_name")} />
                            <input type="text" placeholder="LastName" {...register("last_name")} />
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="Username" {...register("username")} />
                            <input
                                type="text"
                                placeholder="Telegram username"
                                {...register("telegram")}
                            />
                        </div>
                        <div className="input-group">
                            <div className="space-y-2">
                                <PhoneInput
                                    value={phone}
                                    defaultCountry="eg"
                                    onChange={(phone) => setPhone(phone)}
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
                        />
                        <div className="password-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                            />
                            <span
                                className="toggle-password"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <img src={eyeOpen} alt="eye-open" /> : <img src={eyeClosed} alt="eye-closed" />}
                            </span>
                        </div>
                        <div className="password-group">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Password Confirmation"
                                {...register("password_confirmation")}
                            />
                            <span
                                className="toggle-password"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <img src={eyeOpen} alt="eye-open" /> : <img src={eyeClosed} alt="eye-closed" />}
                            </span>
                        </div>
                        <input
                            type="text"
                            placeholder="Referral Code"
                            className="full-width-input"
                            {...register("referral_code")}
                        />
                        <div className="button-group">
                            <button className="signup-btn">Sign Up</button>
                            <Link className="login-btn" href={route("client.login")}>Login</Link>
                        </div>
                    </form>

                    <div className="social-icons">
                        <img src={Telegram} alt="face" className="icon" />
                        <img src={face} alt="face" className="icon" />
                        <img src={LinkedIn} alt="face" className="icon" />
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
