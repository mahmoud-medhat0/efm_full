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
    <section className="w-[800px] my-20 mx-auto max-sm:w-full max-sm:px-3">
      <h2 className="text-black text-2xl pb-6">
        Login To <span className="text-primary">EFM</span>hub.com
      </h2>
      <form
        className="w-[800px] space-y-3 mx-auto max-sm:w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        {renderLoginForm}
        <Button fullWidth isLoading={isLoading}>
          Login
        </Button>
        <div className="flex flex-col space-y-1">
          <Link href={route('client.reset-password')} className="text-black">
            Forgot your password?
            <span className="underline ml-1 text-primary">Reset Password!</span>
          </Link>
          <Link href={route('client.register')} className="text-black">
            Don&#39;t have an account here?
            <span className="underline ml-1 text-primary">Register here!</span>
          </Link>
        </div>
      </form>
    </section>
    </RootLayout>
  );
};
export default LoginPage;