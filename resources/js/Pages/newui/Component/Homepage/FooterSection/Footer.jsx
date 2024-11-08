import "./Footer.css";
import face from "../../../photo/facebook.png";
import LinkedIn from "../../../photo/linkedin-logo.png";
import Telegram from "../../../photo/telegram.png";
import logoo2 from "../../../photo/logo2.svg";
import email from "../../../photo/email.png";
import phone from "../../../photo/phone-call.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3 style={{ color: "#777" }}>
              {" "}
              <img src={logoo2} alt="logo" className="logo-footer" />
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
          <div className="footer-links">
            <div className="footer-column">
              <h4>Service</h4>
              <ul>
                <li>E-Marketing</li>
                <li>SEO</li>
                <li>Content Management</li>
                <li>Earn Money Online</li>
                <li>Affiliate System</li>
              </ul>
            </div>
            <div className="footer-column">
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
          <div className="footer-newsletter">
            <h4>Join a Newsletter</h4>
            <div className="newsletter-input">
              <input type="email" placeholder="Enter Your Email" />
              <button>Subscribe</button>
            </div>
            <div className="social-icons">
              <img src={Telegram} alt="face" className="icon" />
              <img src={face} alt="face" className="icon" />
              <img src={LinkedIn} alt="face" className="icon" />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright ©EFM 2024</p>
          <div className="footer-contact">
            <div className="footer-links-icons">
              <img src={Telegram} alt="Telegram Icon" className="icon" />
              @EFM_Hub
            </div>
            <div className="footer-links-icons">
              <img src={email} alt="Email Icon" className="icon" />
              support@efmhub.com
            </div>
            <div className="footer-links-icons">
              <img src={phone} alt="Phone Icon" className="icon" />
              +201026055342
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
