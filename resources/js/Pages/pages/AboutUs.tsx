import { Link } from "react-router-dom";
import discord from "../../assets/media/discord.svg";
import facebook from "../../assets/media/facebook.svg";
import twitter from "../../assets/media/twitter.svg";
import Eslam from "../../assets/team/Eslam.jpg";
// import Solom from "../../assets/team/solomdev0.jpg";
import Mohammed from "../../assets/team/Mohammed.jpg";
import AbdulRahman from "../../assets/team/Abdul-Rahman.jpg";

const AboutUsPage = () => {
  return (
    <main className="w-full h-full my-20 container">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-2">
          <span className="mark-zigzag">About</span> Us ?
        </h2>
        <p className="pt-3 text-gray-500">
          We are EFMHUB Company, and this is an abbreviation ”{" "}
          <span className="text-hover">Earn Free Money Hub</span> ”, which is a
          legitimate e-marketing company that is not marketed through us with
          fake accounts or illegal views, the company was established in 2022 by
          its founder, Engineer "Abdul-Rahman", who is the company's manager and
          first marketer. We offer a lot of services Follow the rest of the page
          to know more about us!
        </p>
      </div>
      <div className="my-8">
        <h2 className="text-4xl text-black mb-2">
          Our <span className="mark">Mission</span> ?
        </h2>
        <div className="pt-3 text-gray-500">
          <p>
            Our mission is to revolutionize the landscape of online marketing by
            providing innovative and authentic solutions to enhance our client's
            digital presence. We specialize in delivering genuine video views,
            ensuring that each user engagement is a legitimate interaction. Our
            commitment is rooted in ethical practices, transparency, and the
            pursuit of excellence.
          </p>
          <h3 className="text-black text-lg mt-3 mb-1">
            Our Approach: Legitimate Video Views
          </h3>
          <p>
            EFM distinguishes itself by offering a unique approach to digital
            marketing, specifically in the realm of video content. We focus on
            generating authentic video views by engaging real users, thereby
            establishing credibility and trust for our clients. Through
            cutting-edge techniques and strategic partnerships, we ensure that
            every view obtained is a result of genuine interest and interaction.
          </p>
        </div>
      </div>
      <div className="my-8">
        <h2 className="text-4xl text-black mb-2">
          Our <span className="mark">Services</span> ?
        </h2>
        <ul className="pt-3 text-gray-500 list-decimal">
          <li>
            <span className="text-black font-medium">Authentic Engagement</span>
            : EFM prioritizes real-time user engagement to provide our clients
            with authentic and meaningful interactions. This approach not only
            boosts visibility but also fosters a genuine connection between
            content creators and their audience.
          </li>
          <li>
            <span className="text-black font-medium">
              Ethical Marketing Practices
            </span>
            : We adhere to a strict code of ethics, steering clear of artificial
            methods that compromise the integrity of the marketing process. Our
            commitment to transparent and lawful practices sets us apart in the
            competitive landscape of digital marketing.
          </li>
          <li>
            <span className="text-black font-medium">
              Innovative Technology
            </span>
            : EFM leverages cutting-edge technology to optimize video
            distribution, ensuring that our clients' content reaches the right
            audience. Our technological solutions are designed to enhance
            visibility, increase brand recognition, and drive organic growth.
          </li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-4xl text-black mb-2">
          Why{" "}
          <span className="mark">
            Choose <span className="text-[#ff6600]">E</span>
            <span className="text-font">F</span>
            <span className="text-[#ffc221]">M</span>hub
          </span>{" "}
          ?
        </h2>
        <div className="pt-3 text-gray-500">
          <ul className="list-decimal">
            <li>
              <span className="text-black font-medium">Reliability</span>: Count
              on EFM for dependable and consistent results. Our team is
              dedicated to delivering on our promises, providing you with the
              peace of mind that your marketing goals are in capable hands.
            </li>
            <li>
              <span className="text-black font-medium">
                Customized Solutions
              </span>
              : We understand that every client has unique needs. EFM tailors
              its services to align with your specific objectives, offering
              personalized solutions that cater to your brand and target
              audience.
            </li>
            <li>
              <span className="text-black font-medium">
                Results-Driven Approach
              </span>
              : Our success is measured by your success. EFM is committed to
              delivering tangible results, whether it's increased viewership,
              enhanced brand recognition, or improved conversion rates.
            </li>
          </ul>
          <p className="py-3">
            In choosing EFM as your digital marketing partner, you're selecting
            a company that prioritizes authenticity, integrity, and innovation.
            Let us help you navigate the dynamic world of online marketing with
            confidence and competence.
          </p>
          <p>
            For inquiries or to explore our services further, feel free to
            contact us at{" "}
            <Link to={"/contact"} className="text-hover">
              [Contact Information]
            </Link>
            .
          </p>
        </div>
      </div>
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-2">
          Our <span className="mark-zigzag">Team</span> ?
        </h2>
        <div className="flex flex-row justify-between items-center">
          <div className="min-w-[280px] flex flex-col justify-center items-center bg-transparnt shadow-lg border-[1px] border-hover rounded-xl mt-10 py-2">
            <div className="p-3">
              <img
                className="w-56 h-56 rounded-full border-hover border-2 hover:scale-110 cursor-pointer duration-200"
                src={Eslam}
                alt="solom"
              />
              <div className="bg-gray-600 h-[1px] mt-4 " />
            </div>
            <div className="text-center px-2 mb-3">
              <h2 className="text-black text-xl">Eslam Wael.</h2>
              <p className="text-gray-400 text-sm">
                Software Enginner - Front-end Developer.
              </p>
            </div>
            <div className="flex flex-row gap-5 pb-3">
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-hover duration-300"
              >
                <img src={facebook} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-hover duration-300"
              >
                <img src={twitter} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-hover duration-300"
              >
                <img src={discord} alt="" />
              </Link>
            </div>
          </div>
          <div className="min-w-[280px] flex flex-col justify-center items-center bg-transparnt shadow-lg border-[1px] border-font rounded-xl mt-10 py-2">
            <div className="p-3">
              <img
                className="w-56 h-56 rounded-full border-font border-2 hover:scale-110 cursor-pointer duration-200"
                src={AbdulRahman}
                alt="solom"
              />
              <div className="bg-gray-600 h-[1px] mt-4 " />
            </div>
            <div className="text-center px-2 mb-3">
              <h2 className="text-black text-xl">Eng. AbdulRahman</h2>
              <p className="text-gray-400 text-sm">
                CEO of EFMhub.com - Digital Marketing.
              </p>
            </div>
            <div className="flex flex-row gap-5 pb-3">
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-font duration-300"
              >
                <img src={facebook} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-font duration-300"
              >
                <img src={twitter} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-font duration-300"
              >
                <img src={discord} alt="" />
              </Link>
            </div>
          </div>
          <div className="min-w-[280px] flex flex-col justify-center items-center bg-transparnt shadow-lg border-[1px] border-[#ffc221] rounded-xl mt-10 py-2">
            <div className="p-3">
              <img
                className="w-56 h-56 rounded-full border-[#ffc221] border-2 hover:scale-110 cursor-pointer duration-200"
                src={Mohammed}
                alt="solom"
              />
              <div className="bg-gray-600 h-[1px] mt-4 " />
            </div>
            <div className="text-center px-2 mb-3">
              <h2 className="text-black text-xl">Mohammed Samy.</h2>
              <p className="text-gray-400 text-sm">
                Software Enginner - Back-end Developer.
              </p>
            </div>
            <div className="flex flex-row gap-5 pb-3">
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-[#ffc221] duration-300"
              >
                <img src={facebook} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-[#ffc221] duration-300"
              >
                <img src={twitter} alt="" />
              </Link>
              <Link
                to={"/"}
                className="w-9 h-9 rounded-full border-[#323C52] border-[1px] hover:border-[#ffc221] duration-300"
              >
                <img src={discord} alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
