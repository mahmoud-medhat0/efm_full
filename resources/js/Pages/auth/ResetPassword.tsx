/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../../components/schema/Button";
import { RESET_FORM } from "../../data";
import Input from "../../components/schema/Input";
import InputErrorMessage from "../../components/InputErrorMessage";
import { resetSchema } from "../../validation";
import { useState } from "react";
import { IErrorResponse } from "../../interfaces";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "@inertiajs/inertia-react";
import RootLayout from "../../layout";
import { route } from "ziggy-js";
import { translate } from "../../utils/functions";

interface IFormInput {
  email: string;
}

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(resetSchema),
  });

  // Mock function to simulate API call
  const mockApiCall = (data: IFormInput) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email === "success@example.com") {
          resolve({ status: 200 });
        } else {
          reject({ response: { data: { message: "Invalid email address" } } });
        }
      }, 1000);
    });
  };

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    try {
      const response: any = await mockApiCall(data);
      if (response.status === 200) {
        toast.success("Login is done, you will navigate after 2 seconds!", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          // Simulate navigation
          console.log("Navigating to home page...");
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data.message || "An error occurred";
      toast.error(`Login failed: ${message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ** Renders
  const renderRestPasswordForm = RESET_FORM.map(
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
    <section className="w-[800px] my-20 mx-auto max-sm:w-full max-sm:px-3 pt-20">
      <h2 className="text-primary text-2xl pb-6">{translate('Reset Your Password :')}</h2>
      <form
        className="w-[800px] space-y-3 mx-auto max-sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderRestPasswordForm}
        <Button fullWidth isLoading={isLoading}>
          {translate('Submit')}
        </Button>
        <div className="flex flex-col space-y-1">
          <Link href={route("client.login")} className="text-black">
            {translate('Remember your password?')}
            <span className="underline ml-1 text-primary">{translate('Login here!')}</span>
          </Link>
        </div>
        </form>
      </section>
    </RootLayout>
  );
};

export default ResetPasswordPage;
