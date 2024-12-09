
import face from "../../../photo/facebook.png";
import LinkedIn from "../../../photo/linkedin-logo.png";
import Telegram from "../../../photo/telegram.png";
import logoo2 from "../../../photo/logo2.svg";
import email from "../../../photo/email.png";
import phone from "../../../photo/phone-call.png";

const Footer = () => {
  return (
    <>
      <footer className="footer1">
        <div className="footer1-container">
          <div className="footer1-about">
            <h3 style={{ color: "#777" }}>
              {" "}
              <img src={logoo2} alt="logo" className="logo-footer1" />
              EFM HUP
            </h3>
            <br />
            <p>
              EFM is the strongest company for making money online, offering
              unparalleled features and strong rewards that make it the best
              choice for everyone.
            </p>
            <br />
          </div>
          <div className="footer1-links">
            <div className="footer1-column">
              <h4>Service</h4>
              <ul>
                <li>E-Marketing</li>
                <li>SEO</li>
                <li>Content Management</li>
                <li>Earn Money Online</li>
                <li>Affiliate System</li>
              </ul>
            </div>
            <div className="footer1-column">
              <h4>Company</h4>
              <ul>
                <li>Service</li>
                <li>Features</li>
                <li>Our Team</li>
                <li>Portfolio</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div className="footer1-newsletter">
            <h4>Join a Newsletter</h4>
            <div className="footer1-newsletter-input">
              <input type="email" placeholder="Enter Your Email" className="footer1-input-field" />
              <button className="footer1-input-btn">Subscribe</button>
            </div>
            <div className="footer1-social-icons">
              <img src={Telegram} alt="face" className="footer1-icon" />
              <img src={face} alt="face" className="footer1-icon" />
              <img src={LinkedIn} alt="face" className="footer1-icon" />
            </div>
          </div>
        </div>
        <div className="footer1-bottom">
          <p>Copyright ©EFM 2024</p>
          <div className="footer1-contact">
            <div className="footer1-links-icons">
              <img src={Telegram} alt="Telegram Icon" className="footer1-icon" />
              @EFM_Hub
            </div>
            <div className="footer1-links-icons">
              <img src={email} alt="Email Icon" className="footer1-icon" />
              support@efmhub.com
            </div>
            <div className="footer1-links-icons">
              <img src={phone} alt="Phone Icon" className="footer1-icon" />
              +201026055342
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
