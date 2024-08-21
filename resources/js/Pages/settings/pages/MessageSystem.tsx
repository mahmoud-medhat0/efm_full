import MessageTabs from "../../../components/dashboard/tabs/MessageTabs";
import WelcomeTab from "../../../components/dashboard/welcome/WelcomeTab";

const MessageSystemPage = () => {
  return (
    <div className="w-full h-auto mt-20">
      <WelcomeTab />
      <MessageTabs />
    </div>
  );
};

export default MessageSystemPage;
