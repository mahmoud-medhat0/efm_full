/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/schema/Button";
import { RESET_FORM } from "../../data";
import Input from "../../components/schema/Input";
import InputErrorMessage from "../../components/InputErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetSchema } from "../../validation";
import { useState } from "react";
import { IErrorResponse } from "../../interfaces";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IFormInput {
  email: string;
}

const ResetPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useNavigate();

  // ** Cookies
  const cookie = new Cookies();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(resetSchema),
  });

  // ** Handlers
  const onSubmit: SubmitHandler<IFormInput> = async (data: any) => {
    setIsLoading(true);
    try {
      const { status, data: resData } = await axiosInstance.post(
        "/reset",
        data
      );
      cookie.set("userLogged", resData);
      if (status === 200 || 201) {
        toast.success("Login is done, you will navigate after 2 seconds!", {
          position: "bottom-center",
          duration: 4000,
        });
        setTimeout(() => {
          router("/");
        }, 2000);
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
    <section className="w-[800px] my-20 mx-auto">
      <h2 className="text-primary text-2xl pb-6">Reset Your Password :</h2>
      <form
        className="w-[800px] space-y-3 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderRestPasswordForm}
        <Button fullWidth isLoading={isLoading}>
          Submit
        </Button>
        <div className="flex flex-col space-y-1">
          <Link to={"/login"} className="text-black">
            Remember your password?
            <span className="underline ml-1 text-primary">Login here!</span>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default ResetPasswordPage;
