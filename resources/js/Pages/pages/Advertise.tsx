import {
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  GifIcon,
  LinkIcon,
  TvIcon,
} from "@heroicons/react/20/solid";
import AdvertiseCards from "../../components/cards/AdvertiseCards";
import RootLayout from "../../layout";

const AdvertisePage = () => {
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container">
      <h2 className="text-4xl text-black mb-2 max-sm:text-center">
        Advertise on{" "}
        <span className="mark">
          <span className="text-primary">EFM</span>hub!
        </span>
      </h2>
      <div className="w-full grid grid-cols-3 max-sm:grid-cols-1 gap-4 mt-16">
        <AdvertiseCards
          title="Paid To Click Ads"
          price="100000 Credits - $100"
        >
          <CursorArrowRaysIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
        <AdvertiseCards title="Text Ads" price="100000 Credits - $100">
          <DocumentTextIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
        <AdvertiseCards title="Banner Ad" price="100000 Credits - $100">
          <GifIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
        <AdvertiseCards title="Link Ads" price="100000 Credits - $100">
          <LinkIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
        <AdvertiseCards title="Video Ads" price="100000 Credits - $100">
          <TvIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
        <AdvertiseCards title="Fixed PTC Ads" price="100000 Credits - $100">
          <ArrowsPointingOutIcon className="w-8 h-8 max-sm:w-10 max-sm:h-10 text-primary" />
        </AdvertiseCards>
      </div>
    </main>
    </RootLayout>
  );
};

export default AdvertisePage;
