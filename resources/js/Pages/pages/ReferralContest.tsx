import { usePage } from "@inertiajs/inertia-react";
import Tabs from "../../components/schema/Tabs";
import RootLayout from "../../layout";
import React from "react";
import CountUp from 'react-countup';
import { translate } from "../../utils/functions";

const ReferralContestPage = () => {
  const { props } = usePage();
  const locale = props.locale;
  return (
    <RootLayout>
      <main className="w-full h-full my-20 container pt-20 text-center" dir={locale === "ar" ? "ltr" : "rtl"}>
        <div className="mb-2">
          <h2 className="text-4xl text-black mb-4">
            {translate("home.referral-contest")} <span className="mark-zigzag">{translate("home.contest")}</span>
          </h2>
          <p className="text-sm text-black">
              {translate("home.referral-contest-description")}
          </p>
        </div>
        <div className="text-center pt-10">
          <p className="text-2xl text-gold" style={{ fontSize: "3rem" }}>
            {translate("home.total-users")}: <CountUp className=" font-bold" start={0} end={props.clients} duration={1} />
          </p>
        </div>
        <div className="w-full">
          <Tabs
            referralsLast24Hours={props.referralsLast24Hours}
            referralsLast7Days={props.referralsLast7Days}
            referralsLast30Days={props.referralsLast30Days}
            referralsLast24HoursTop100={props.referralsLast24HoursTop100}
            referralsLast7DaysTop100={props.referralsLast7DaysTop100}
            referralsLast30DaysTop100={props.referralsLast30DaysTop100}
            referralsTop100={props.referralsTop100}
          />
        </div>
      </main>
    </RootLayout>
  );
};

export default ReferralContestPage;
