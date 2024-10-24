import ADSCards from "../../../components/cards/ADSCards";
import ads from "../../../assets/ads/ads.png";
import home from "../../../assets/ads/home.png";
import referral_contest from "../../../assets/ads/referral_contest.png";
import RootLayout from "../../../layout";
const ViewAdsPage = () => {
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4 max-sm:text-center">
          View <span className="mark">Advertisements</span>
        </h2>
      </div>
      <div className="w-full py-20">
        <div className="w-full flex flex-col items-center justify-end gap-y-5">
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-12 max-sm:gap-3">
            <ADSCards
              URL="Bitmortel Monthly ADS!"
              img={ads}
              title="Bitmortel Monthly ADS!"
              mission="Trade with the world’s largest retail broker .."
              money="$0.89"
              time="1s"
            />
            <ADSCards
              URL="Bitmortel Monthly Referral Contest!"
              img={home}
              title="Bitmortel Youtube Channel!"
              mission="Subscribe, Like, Add Your Comment!"
              money="$0.89"
              time="1s"
            />
            <ADSCards
              URL="Bitmortel Monthly Referral Contest!"
              img={referral_contest}
              title="Bitmortel Monthly Referral Contest!"
              mission="Get A Chance To Win Prizes Up To $1,100 .."
              money="$0.89"
              time="1s"
            />
          </div>
        </div>
        </div>
      </main>
    </RootLayout>
  );
};

export default ViewAdsPage;
