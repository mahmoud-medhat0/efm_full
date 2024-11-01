import InputErrorMessage from "../../components/InputErrorMessage";
import Button from "../../components/schema/Button";
import Input from "../../components/schema/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { REGISTER_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../../interfaces";
import { Link } from "@inertiajs/inertia-react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import RootLayout from "../../layout";
import axios from 'axios'
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/inertia-react";
import { translate } from "../../utils/functions";

interface IFormInput {
  first_name: string;
  last_name: string;
  phone?: string;
  email: string;
  password: string;
  password_confirmation: string;
  telegram: string;
  referral_code?: string;
}

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const { referral_code } = usePage().props;
  // const router = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  // Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
          route("client.login");
        }, 1500);
      }
    } catch (error) {
      const errorObj = error as AxiosError<IErrorResponse>;
      const errorMessages = error.response.data.errors || ["An unexpected error occurred"];
      Object.keys(errorMessages).forEach((key) => {
        toast.error(`${key}: ${errorMessages[key]}`, {
          position: "top-right",
          duration: 4000,
        });
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Renders
  const renderRegisterForm = REGISTER_FORM.map(
    ({ name, placeholder, type, forl, placel, validation }, idx) => {
      console.log(placeholder);
      const translatedPlacel = translate(placel);
      const translatedPlaceholder = translate(placeholder.replace("..", "").trim());
      console.log(translatedPlaceholder);
      return (
        <div key={idx}>
          <div className="space-y-2 pb-1">
            <label htmlFor={forl} className="text-black text-xl">
              {translatedPlacel}
            </label>
            {name === "phone" ? (
              <div className="space-y-2">
                <PhoneInput
                  value={phone}
                  defaultCountry="eg"
                  onChange={(phone) => setPhone(phone)}
                />
                {(phone.trim() === "" || phone.trim().length <= 2) && (
                  <InputErrorMessage msg={"Phone is Required!"} />
                )}
              </div>
            ) : name === "referral_code" ? (
              <Input
                value={referral_code}
                type={type}
                placeholder={translatedPlaceholder}
                {...register(name, validation)}
              />
            ) : (
              <Input
                id={forl}
                type={type}
                placeholder={translatedPlaceholder}
                {...register(name, validation)}
              />
            )}
            {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
          </div>
        </div>
      );
    }
  );

  return (
    <RootLayout>
    <section className="w-[800px] my-24 mx-auto max-sm:w-full max-sm:px-3 pt-20">
      <h2 className="text-primary text-2xl pb-6 text-center">{translate("Register with a new account!")}</h2>
      <form
        className="w-[800px] space-y-3 mx-auto max-sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderRegisterForm}
        <Button fullWidth isLoading={isLoading}>
          {translate("Register")}
        </Button>
        <div className="flex flex-col space-y-2">
          <Link href={route('client.login')} className="text-black">
            {translate("Having an account here?")}
            <span className="underline ml-1 text-primary">{translate("Login now!")}</span>
          </Link>
        </div>
      </form>
      </section>
    </RootLayout>
  );
};

export default RegisterPage;
