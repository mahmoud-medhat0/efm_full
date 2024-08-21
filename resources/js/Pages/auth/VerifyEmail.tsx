import React from "react";
import Button from "../../components/schema/Button";
import RootLayout from "../../layout";
import { route } from "ziggy-js";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";

const ConfirmEmailPage = () => {
  const handleLogout = () => {
    axios.post(route("client.logout")).then(() => {
      setTimeout(() => {
        Inertia.get(route("client.login"));
        toast.success("Your are Loggedout!");
      }, 1500);
    });
  };
  const handleResendCode = () => {
    axios.post(route("client.verification.send")).then(() => {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      toast.success("Code sent!", {
        duration: 5000,
        position: "top-center",
      });
    });
  };
  return (
    <RootLayout>
      <section className="w-[800px] my-20 mx-auto">
        <h2 className="text-primary text-5xl font-medium pb-6 text-center">Confirm Email</h2>
        <div className="col-xl-5 col-lg-8 col-md-12">
          <div className="auth-content">
            <div className="title">
              <h2 className="text-primary text-3xl font-medium pb-6 text-center">👋 Welcome Back!</h2>
              <p className="text-center text-gray-500 mb-6 text-2xl">verify your email address by clicking on the link we just emailed to you</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center space-x-3">
          <Button fullWidth onClick={handleResendCode}>
            Resend Code
          </Button>
          <Button fullWidth variant={"danger"} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>
    </RootLayout>
  );
};

export default ConfirmEmailPage;
