import './Pricing.css'
const Pricing = () => {
  return (
    <>
        <div className="pricing-container" id="pricing">
            <h1 style={{color:"black"}}>EFM Company Opening <span className="highlight">Presentation</span></h1>
            <p className='lines'>On the occasion of our company's opening, we are pleased to offer you very strong deals and discounts. Don't miss the opportunity!</p>
            <div className="pricing-cards">
                <div className="pricing-card">
                    <div className="discount">50%</div>
                    <div className="price">$25.00</div>
                    <p>A 50% discount on the subscription fee for the first 1000 subscribers! Instead of $50, it will be only $25.</p>
                    <button className="btn-start">Get started today</button>
                </div>
                <div className="pricing-card highlight-card">
                    <div className="discount">40%</div>
                    <div className="price">$30.00</div>
                    <p>A 40% discount on the subscription fee for the next 1,000 subscribers! Instead of $50, it will be only $30.</p>
                    <button className="btn-start">Get started today</button>
                </div>
                <div className="pricing-card">
                    <div className="discount">30%</div>
                    <div className="price">$35.00</div>
                    <p>A 30% discount on the subscription fee for the next 3000 subscribers! Instead of $50, it will be only $35.</p>
                    <button className="btn-start">Get started today</button>
                </div>
            </div>
            
            <p className="footer-note">After the number of subscribers reaches 8000, the offer will end, and the subscription fee will be 50 dollars!</p>
        </div>
    </>
  )
}

export default Pricing
