import HeroSection from "../components/website/HeroSection";
import FeaturesSection from "../components/website/FeaturesSection";
import PaymentsSection from "../components/website/PaymentsSection";
import AdvertiseSection from "../components/website/AdvertiseSection";
import VisionSection from "../components/website/VisionSection";
import FaqSection from "../components/website/FaqSection";
import ReferralSection from "../components/website/ReferralSection";
import PartnersSection from "../components/website/PartnersSection";
import FeedbackSection from "../components/website/FeedbackSection";
import About from "../components/website/About";
import RootLayout from "../layout";
import Membershipe from "../components/website/membershipe";
import Advertise from "../components/website/Advertise";
import Referal from "../components/website/referal";
const HomePage = () => {
  return (
    <RootLayout>
    <div className="w-full h-auto space-y-0 max-sm:space-y-0 max-sm:overflow-x-hidden" style={{ backgroundColor: 'rgb(234 234 234)' }}>
      <HeroSection />
        <About />
        {/* <FeaturesSection /> */}
        <PaymentsSection />
        <Membershipe />
        <Advertise />
      <Referal />
      
        {/* <AdvertiseSection /> */}
        {/* <VisionSection /> */}
        {/* <ReferralSection /> */}
         <FaqSection />
        <FeedbackSection />
        <PartnersSection /> 
      </div>
  
    </RootLayout>
  );
};

export default HomePage;