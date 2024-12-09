
import photo2 from "../../../photo/photo2.svg";
import emLogo from "../../../photo/Vector 1.svg";
const Hero = () => {
    return (
        <section>
        <div className="Hero-welcome-section ">
          <h1 className="Hero-welcome-text">
            Welcome to{" "}
            <span className="Hero-highlight relative">
              EFM <img src={emLogo} alt="" className="absolute" />
            </span>{" "}
            hub
          </h1>
          <div className="Hero-about-section-icon-text flex items-center sm:flex-col sm:items-center lg:flex-row lg:items-start sm:gap-2 lg:gap-4 sm:m-auto lg:m-0">
                <p className="Hero-hero-section-p text-center lg:text-left">
                🚀 Designed to Lead and Built to Last
                </p>
            </div>
            <img src={photo2} alt="Welcome Image" className="Hero-welcome-image" />
        </div>

            {/* <div className="Hero-statistics-section">
                <div className="Hero-stat-item">
                    <h1 className="Hero-number">450</h1>
                    <p className="Hero-label">Total Clients</p>
                </div>
                <div className="Hero-stat-item">
                    <h1 className="Hero-number">50</h1>
                    <p className="Hero-label">Clients Profits</p>
                </div>
                <div className="Hero-stat-item">
                    <h1 className="Hero-number">500</h1>
                    <p className="Hero-label">Clients Contracts</p>
                </div>
            </div> */}
        </section>
    );
};

export default Hero;
