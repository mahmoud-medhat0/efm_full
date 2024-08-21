import ProtectAlert from "../../../../components/dashboard/alerts/ProtectAlert";
import WelcomeTab from "../../../../components/dashboard/welcome/WelcomeTab";

const TwoFactorAuthentication = () => {
  return (
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <div className="w-full px-2 py-12 sm:px-0">
        <h3 className="text-lg mb-4">Two Factor Authentication</h3>
        <ProtectAlert msg="Protect your account with high security log in. The two-factor authentication code will be also requested when you try to change your settings or request a payment. Download the app for android or iPhone and iPad!" />
        <div>
          <h4>
            Two-factor authentication is{" "}
            <span className="bg-red-600 text-black p-1 text-sm rounded-sm cursor-pointer">
              Disable
            </span>
          </h4>
          <div>
            <h4>Enable two-factor authentication</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
