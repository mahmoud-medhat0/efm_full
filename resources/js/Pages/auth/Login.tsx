/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Button from "../../components/schema/Button";
import Input from "../../components/schema/Input";
import { LOGIN_FORM } from "../../data";
import { yupResolver } from "@hookform/resolvers/yup";
import InputErrorMessage from "../../components/InputErrorMessage";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../validation";
import toast from "react-hot-toast";
import { Link } from "@inertiajs/inertia-react";
import RootLayout from "../../layout";
import axios from 'axios';
import { route } from "ziggy-js";
import { Inertia } from '@inertiajs/inertia';
import { translate } from "../../utils/functions";
interface IFormInput {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  // ** Handlers
  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const { status, data: resData } = await axios.post(
        route('client.login.post'),
        data,
        {
          headers: {
            'X-CSRF-TOKEN': csrfToken
          }
        }
      );
      
      if (status === 200 || status === 201) {
        // Inertia.reload({ only: ['authed'] });
        toast.success("Login successful! Redirecting in 2 seconds...", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          Inertia.get(route('client.dashboard'));
        }, 2000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error(error);
      let errorMessage = "An unexpected error occurred";
      
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || error.message;
      }
      
      toast.error(`Login failed: ${errorMessage}`, {
        position: "bottom-center",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** Renders
  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, forl, placel, validation }, idx) => {
      const translatedName = translate(name);
      const translatedPlaceholder = translate(placeholder);
      const translatedPlacel = translate(placel);
      return (
        <div key={idx}>
          <div className="space-y-2 pb-1">
            <label htmlFor={forl} className="text-black text-xl">
              {translatedPlacel}
            </label>
            <Input
              id={forl}
              type={type}
              placeholder={translatedPlaceholder}
              {...register(name, validation)}
            />
          </div>
          {errors[translatedName] && <InputErrorMessage msg={errors[translatedName]?.message} />}
        </div>
      );
    }
  );

  return (
    <RootLayout>
    <section className="w-full my-20 mx-auto max-sm:w-full max-sm:px-3 pt-20">
      <h2 className="text-black text-2xl pb-6 text-center">
        {window.translate("login.title")} <span className="text-primary">{window.translate("login.efm")}</span>{window.translate("login.hub")}
      </h2>
      <form
        className="w-[800px] space-y-3 mx-auto max-sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          {window.translate("login.login")}
        </Button>
        <div className="flex flex-col space-y-1">
          <Link href={route('client.reset-password')} className="text-black">
            {window.translate("login.forgot")}
            <span className="underline ml-1 text-primary">{window.translate("login.reset")}</span>
          </Link>
          <Link href={route('client.register')} className="text-black">
            {translate("login.dontHave")}
            <span className="underline ml-1 text-primary">{translate("login.register")}</span>
          </Link>
        </div>
      </form>
    </section>
    </RootLayout>
  );
};
export default LoginPage;