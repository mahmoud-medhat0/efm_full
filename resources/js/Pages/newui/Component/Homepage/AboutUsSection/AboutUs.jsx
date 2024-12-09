
import loggggo from "../../../photo/logo2.svg";
import photo3 from "../../../photo/photo3.svg";
import logoo333 from "../../../photo/logo3.svg";
import icon from "../../../photo/Icon.svg";
import { useEffect } from 'react';

const Aboutus = () => {
  useEffect(() => {
    if (window.location.hash === '#about') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
    <div className="bg-[#f9f9f9]" id="about">
      <div className="Aboutus-about-section-container ">
        <div className="Aboutus-about-section-header ">
        </div>
        <div className="Aboutus-about-section-content">
          <div className="Aboutus-about-section-left-column">
            <img
              src={photo3}
              alt="Panther Image"
              className="Aboutus-about-section-panther-image"
            />
            <div className="Aboutus-efm-hub-container">
              <img src={loggggo} alt="EFM Logo" className="Aboutus-efm-logo" />
              <span className="Aboutus-efm-text">EFM HUB</span>
            </div>
          </div>
          <div className="Aboutus-about-section-right-column">
            <h1 className="flex">
              <span className="text-3xl lg:text-5xl font-bold ">
                About <span className="Aboutus-about-section-highlight mr-2">US</span>{" "}
              </span>
              <br/>
            </h1>
            <p>
              <strong>EFM</strong> is the strongest company for making money
              online, offering unparalleled features and strong rewards that
              make it the best choice for everyone.
            </p>
            <br />
            <p>
              We believe in the power of innovation and technology and always
              strive to provide advanced solutions that meet our clients' needs.
            </p>
            <br />
            <p>
              We offer you the opportunity to earn money through simple and
              enjoyable tasks such as watching videos and interacting on social
              media channels <br />
              These tasks will be your means to make money and achieve wealth
              effortlessly, without any experience, and with minimal investment
              cost.
              <br /> <br />
              We also help companies advertise all their services and products,
              and in return, we provide them with a large audience and real
              followers from all over the world. Thanks to our well-thought-out
              strategies, our clients can reach a targeted audience and
              significantly increase their visibility.
            </p>
          </div>
        </div>
        <div className="Aboutus-about-section-goals-vision">
          <div className="Aboutus-about-section-goal-card">
            <h3>◎ Our goals</h3>
            <p>
              Contributing to the transition of the advertising market from
              centralization to decentralization, ending the monopoly of
              companies on advertising profits...
            </p>
          </div>
          <img src={icon} alt="icon" className="Aboutus-about-section-icon" />
          <div className="Aboutus-about-section-vision-card">
            <h3>◎ Our vision</h3>
            <p>
              To be the first true online platform to provide passive income to
              all social classes and help the largest number of smartphone users
              worldwide achieve financial security.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="section-divider"></div>
    </>
  );
};

export default Aboutus;