import { useState } from 'react';
import './ReferralContestPage.css';
import photo from '../../photo/refelr.svg';
import trophy from '../../photo/trophy-star 1.svg';
import Layout from "../../Layout/Layout";
import { usePage } from '@inertiajs/inertia-react';
import Leaderboard from './Leaderboard';
function ReferralContestPage() {
  const { clients, referralsLast24Hours, referralsLast7Days, referralsLast30Days, referralsTop100 } = usePage().props;
  console.log(referralsLast24Hours);
  const data = {
    'Last 24 hours': referralsLast24Hours.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })),
    'Last 7 Days': referralsLast7Days.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })),
    'Last 30 Days': referralsLast30Days.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })),
    'Top 100': referralsTop100.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })),
  };

  const [activeTab, setActiveTab] = useState('Last 24 hours');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredData = data[activeTab];

  return (
    <Layout>
    <div className="referral-page">
      
     
      <h2 className="title-referral">
        Total subscribers <span className="subscriber-count">{clients}</span>
      </h2>
      <img src={photo} alt="Referral" className="referral-image" />
     
      <div className="referral-contest">
        <p className="contest-description">Get financial rewards when you encourage your friends to join EFMhub through your referral link.</p>
        
        <div className="time-filters">
          {Object.keys(data).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={activeTab === tab ? 'active-tab' : ''}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <Leaderboard data={filteredData} />
      </div>
    </div>
    </Layout>
  );
}

export default ReferralContestPage;
