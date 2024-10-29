import React from "react";
import Button from "../../components/schema/Button";
import RootLayout from "../../layout";
import { route } from "ziggy-js";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import toast from "react-hot-toast";
import { translate } from "../../utils/functions";
import { useState } from "react";
const ConfirmEmailPage = () => {
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingResendCode, setIsLoadingResendCode] = useState(false);
  const handleLogout = async () => {
    setIsLoadingLogout(true);
    try {
      await axios.post(route("client.logout"));
      setTimeout(() => {
        Inertia.get(route("client.login"));
        toast.success("Your are Loggedout!");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => {
        setIsLoadingLogout(false);
      }, 1500);
    }
  };
  const handleResendCode = async () => {
    setIsLoadingResendCode(true);
    try {
      await axios.post(route("client.verification.send"));
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      toast.success("Code sent!", {
        duration: 5000,
        position: "top-center",
      });
      setTimeout(() => {
        setIsLoadingResendCode(false);
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setTimeout(() => {
        setIsLoadingResendCode(false);
      }, 1500);
    }
  };
  return (
    <RootLayout>
      <section className="w-full my-20 mx-auto pt-20 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg max-w-lg w-full p-4">
          <h2 className="text-primary text-4xl font-semibold pb-4 text-center">{translate("confirm-email")}</h2>
          <div className="auth-content">
            <div className="title">
              <h2 className="text-primary text-2xl font-medium pb-4 text-center">👋 {translate("welcome-back")}!</h2>
              <p className="text-center text-gray-600 mb-6 text-lg">{translate("verify-email")}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-3">
            <Button fullWidth onClick={handleResendCode} isLoading={isLoadingResendCode}>
              {translate("resend-code")}
            </Button>
            <p></p>
            <Button fullWidth variant={"danger"} onClick={handleLogout} isLoading={isLoadingLogout}>
              {translate("logout")}
            </Button>
          </div>
        </div>
      </section>
    </RootLayout>
  );
};

export default ConfirmEmailPage;
