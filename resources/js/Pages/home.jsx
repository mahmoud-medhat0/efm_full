import HeroSection from "../components/website/HeroSection";
import FeaturesSection from "../components/website/FeaturesSection";
import PaymentsSection from "../components/website/PaymentsSection";
import AdvertiseSection from "../components/website/AdvertiseSection";
import VisionSection from "../components/website/VisionSection";
import FaqSection from "../components/website/FaqSection";
import ReferralSection from "../components/website/ReferralSection";
import PartnersSection from "../components/website/PartnersSection";
import FeedbackSection from "../components/website/FeedbackSection";
import RootLayout from "../layout";
const HomePage = () => {
  return (
    <RootLayout>
    <div className="w-full h-auto space-y-36 max-sm:space-y-32 max-sm:overflow-x-hidden">
      <HeroSection />
      <div className="sections container">
        <FeaturesSection />
        <PaymentsSection />
        <AdvertiseSection />
        <VisionSection />
        <ReferralSection />
        <FaqSection />
        <FeedbackSection />
        <PartnersSection />
      </div>
    </div>
    </RootLayout>
  );
};

export default HomePage;