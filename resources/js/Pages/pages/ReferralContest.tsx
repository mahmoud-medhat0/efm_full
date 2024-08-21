import Tabs from "../../components/schema/Tabs";
import RootLayout from "../../layout";
const ReferralContestPage = () => {
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          Referral <span className="mark-zigzag">Contest</span>
        </h2>
        <p className="text-sm text-gray-400">
          Get financial prizes when you invite your friends to Join Bitmortel
          through your referral link.
        </p>
      </div>
      <div className="w-full">
        <Tabs />
      </div>
    </main>
    </RootLayout>
  );
};

export default ReferralContestPage;
