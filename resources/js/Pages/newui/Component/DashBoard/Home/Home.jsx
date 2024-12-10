import React from "react";
import DashboardLayout from '../../../Layout/DashboardLayout';
import homs from '../../../../newui/photo/homs.svg'
import homs2 from '../../../../newui/photo/Homes2.svg'
import homs3 from '../../../../newui/photo/Homes3.svg'
import homs4 from '../../../../newui/photo/Homes4.svg'
import { usePage } from "@inertiajs/inertia-react";
function Homes() {
  const { services, pending_withdrawls, direct_referrals, referrals_earn,deposits,tasks,tasks_completed } = usePage().props;
  const client = usePage().props.auth.client;
  return (
    <DashboardLayout>
    <div className="dashboard">
      {/* Balance Card */}
      <div className="balance-card-container">

      <div className="card-container">
        <div className="balance-card">
          <p className="card-title">Current Balance</p>
          <h1 className="card-amount">{client.balance} EGP</h1>
          <p className="card-membership">Your Membership Is : <span style={{ color: client.membership ? '#97866b' : 'white' }}>{client.membership?.name ?? "Free"}</span></p>
          <div className="card-footer">
            <span className="card-id">ID : {client.id}</span>
            <span className="card-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <div className="card-logo">EFM</div>
        </div>
      </div>
        <div className="card-containers">
          <div className="continer-header">
           <span className="continer-header-span">General Stats</span> 
           <div className="card-container">
          <div className="card-content">
            <h4 style={{fontSize:"16px" , color:"#555555"}}>Earning Balance Stats</h4>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="icon-box">
                  <i className="icon-balance"></i>
                </div>
                <div className="balance-cards">
                <div className="balance-cards-icon-section">
                    <img src={homs} alt="balance-cards-icon" className="balance-cards-icon" />
                    <span className="balance-cards-label">Balance</span>
                </div>
                <div className="balance-cards-amount-section">
                    <span className="balance-cards-amount">{client.balance} EGP</span>
                </div>
                </div>
              </div>
              <div className="stat-item">
                <div className="icon-box">
                  <i className="icon-purchase"></i>
                </div>
                <div className="balance-cards2">
                <div className="balance-cards-icon-section">
                    <img src={homs2} alt="balance-cards-icon" className="balance-cards-icon" />
                    <span className="balance-cards-label">Purchase balance</span>
                </div>
                <div className="balance-cards-amount-section">
                    <span className="balance-cards-amount">{deposits} EGP</span>
                </div>
                </div>
              </div>
              <div className="stat-item">
                <div className="icon-box">
                  <i className="icon-payments"></i>
                </div>
                <div className="balance-cards3">
                <div className="balance-cards-icon-section">
                    <img src={homs3} alt="balance-cards-icon" className="balance-cards-icon" />
                    <span className="balance-cards-label">Payments Received</span>
                </div>
                <div className="balance-cards-amount-section">
                    <span className="balance-cards-amount">0 EGP</span>
                </div>
                </div>
              </div>
              <div className="stat-item disabled">
                <div className="icon-box">
                  <i className="icon-pending"></i>
                </div>
                <div className="balance-cards4">
                <div className="balance-cards-icon-section">
                    <img src={homs4} alt="balance-cards-icon" className="balance-cards-icon" />
                    <span className="balance-cards-label">Pending Withdraws</span>
                </div>
                <div className="balance-cards-amount-section">
                    <span className="balance-cards-amount">{pending_withdrawls} EGP</span>
                </div>
                </div>
              
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>
      
<div className="balance-card2-container">

<div className="card-container">
        <div className="daily-tasks-card">
          <h3 style={{marginTop:"10px"}}>Daily Tasks</h3>
          <div className="circle-chart-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:"10px" }}>
            <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
              <path
                className="circle-bg"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circle"
                stroke-dasharray="50, 100"
                d="M18 2.0845
                   a 15.9155 15.9155 0 0 1 0 31.831
                   a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <text x="18" y="22.35" className="percentage">
                {tasks_completed}/{tasks}
              </text>
            </svg>
            <p className="circle-label">Show Tasks</p>
          </div>
          <div className="legend">
            <div className="legend-item">
              <span className="completed"></span> Has been completed
            </div>
            <div className="legend-item">
              <span className="not-completed"></span> Hasn't been completed
            </div>
          </div>
        </div>
        
      </div>
<div className="card-containers">
        <div className="advertiser-card">
          <div className="continer-header">
            <span className="continer-header-span">Advertiser Stats</span>
            <div className="card-container">
          <div className="card-content">
            {services.map((service) => (
            <div className="stat-item">
              <span className="bullet"></span> {service.name} Credits <span className="value">{service.completed}</span>
            </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      </div>

</div>
      {/* Advertiser Stats */}
     
     <div className="balance-card3-container">
         <div className="card-container">
        <div className="referral-stats-card" style={{ width: '100%', padding: '10px', marginRight:"10px" , backgroundColor:"#e9e6e6"}}>
          <div className="continer-header">
            <span className="continer-header-span">Referral Stats</span>
            <div className="card-container">
          <div className="card-content">
            <div className="stat-item">
              <span className="bullet"></span>
              <span className="stat-label">Direct Referrals</span>
              <span className="stat-value">{direct_referrals}</span>
            </div>
            <div className="stat-item">
              <span className="bullet"></span>
              <span className="stat-label">Earned so far</span>
              <span className="stat-value">{referrals_earn} <span className="currency">EGP</span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="card-containers">
      <div className="card-containers">
        <div className="advertisement-clicks-card" style={{ width: '100%', padding: '10px', marginRight:"10px" }}>
          <div className="continer-header">
            <span className="continer-header-span">Your Advertisement Clicks</span>
            <div className="card-container">
          <div className="card-content">
            <div className="stat-item">
              <span className="bullet"></span>
              <span className="stat-label">Your Clicks</span>
              <span className="stat-value">0</span>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>

      
      <div className="card-containerse">
        <div className="referral-stats-card" style={{ width: '100%', padding: '10px', marginRight:"10px" }}>
          <div className="continer-header">
            <span className="continer-header-span">Video Ads Stats</span>
            <div className="card-container">
          <div className="card-content">
            <div className="stat-item">
              <span className="bullet"></span>
              <span className="stat-label">Total plays</span>
              <span className="stat-value">0</span>
            </div>
            <div className="stat-item">
              <span className="bullet"></span>
              <span className="stat-label">Earned</span>
              <span className="stat-value">0 <span className="currency">EGP</span></span>
            </div>
          </div>
        </div>
      </div>
     </div>
     </div>
     </div>
     </div>
     </div>
       
      {/* Referral Stats */}
     
      
    </div>
    </DashboardLayout>
  );
}

export default Homes;
