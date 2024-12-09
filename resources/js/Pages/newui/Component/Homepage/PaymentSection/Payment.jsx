
// import we pay from '../../../../photo/we pay.svg'
 import etisalat from '../../../photo/etsalit.svg'
import instpay from '../../../photo/انستباي.svg'
 import bank from '../../../photo/banx.svg'
 import vodefone from '../../../photo/vodefone.svg'
 import orange from '../../../photo/orange.svg'
import { useEffect } from 'react';

import we from '../../../photo/we pay.svg'

const Payment = () => {
    useEffect(() => {
        if (window.location.hash === '#offers') {
          const aboutSection = document.getElementById('offers');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, []);
  return (
    <div className="offers-section" id="offers">
    <div className="offers-header">
        <h2>OFFERS</h2>
    </div>
    <div className="offers-container">
        <div className="offers-card">
            <div className="offers-discount">50%</div>
            <div className="offers-details">
                <h3>$25.00</h3>
                <p>A 50% discount on the subscription fee for the first 1000 subscribers! Instead of $50, it will be only $25.</p>
            </div>
        </div>
        <div className="offers-card">
            <div className="offers-discount">40%</div>
            <div className="offers-details">
                <h3>$30.00</h3>
                <p>A 50% discount on the subscription fee for the first 1000 subscribers! Instead of $50, it will be only $25.</p>
            </div>
        </div>
        <div className="offers-card">
            <div className="offers-discount">30%</div>
            <div className="offers-details">
                <h3>$35.00</h3>
                <p>A 50% discount on the subscription fee for the first 1000 subscribers! Instead of $50, it will be only $25.</p>
            </div>
        </div>
    </div>
    <p className="offers-footer">
        After the number of subscribers reaches 5000, the offer will end, and the subscription fee will be 50 dollars!
    </p>
    <div className="offers-payment-section">
        <h3>We accept payments via!</h3>
        <div className="section-divider"></div>
        <div className="offers-payment-logos">
            <img src={orange} alt="Orange Money" />
            <img src={we} alt="We Pay" />
            <img src={instpay} alt="Instapay" />
            <img src={vodefone} alt="Vodafone" />
            <img src={etisalat} alt="Aman" />
            <img src={bank} alt="Etisalat" />
        </div>
    </div>
    <div className="section-divider"></div>
</div>

          


  )
}

export default Payment;
