import { useState } from 'react';
import photo from '../../photo/refelr.svg';
import trophy from '../../photo/trophy-star 1.svg';
import Layout from "../../Layout/Layout";
import { usePage } from '@inertiajs/inertia-react';
import Leaderboard from './Leaderboard';
function ReferralContestPage() {
  const { clients, referralsLast24Hours, referralsLast7Days, referralsLast30Days, referralsTop100 } = usePage().props;
  const data = {
    'Last 24 hours': referralsLast24Hours.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })).sort((a, b) => a.referrals - b.referrals), // Sort by referral count to ensure consistent order
    'Last 7 Days': referralsLast7Days.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })).sort((a, b) => a.id - b.id),
    'Last 30 Days': referralsLast30Days.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })).sort((a, b) => a.id - b.id),
    'Top 100': referralsTop100.map((referral, index) => ({
      id: index + 1,
      username: referral.name,
      joiningDate: referral.joining_date,
      daysCount: referral.days_count,
      referrals: referral.referral_count,
    })).sort((a, b) => a.id - b.id),
  };

  const [activeTab, setActiveTab] = useState('Last 24 hours');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const filteredData = data[activeTab];

  return (
    <Layout>
    <div className="referral-page">
      
     
      <h2 className="referral-title-referral">
        Total subscribers <span className="referral-subscriber-count">{clients}</span>
      </h2>
      <img src={photo} alt="Referral" className="referral-image" />
     
      <div className="referral-contest">
        <p className="referral-contest-description">Get financial rewards when you encourage your friends to join EFMhub through your referral link.</p>
        
        <div className="referral-time-filters">
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
