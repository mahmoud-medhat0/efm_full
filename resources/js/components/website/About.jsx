import OwnerLogo from '../../assets/owner.jpg'  
export default function About() {
  return <>
  <div id="about-us" className="text-center text-secondary py-20 ">
<div className=" mx-auto px-8 md:px-16 lg:px-24 ">
    <h2 className="text-4xl text-secondary font-bold text-center mb-12 ">
            Who <span className="mark-zigzag">We</span> Are ?
          </h2>
<img src={OwnerLogo} alt="About Us"
 className="mx-auto w-72 h-84 rounded object-cover  mb-8 md:md-0" />


    

 {/* Introduction */}
 <section className="mb-12 flex flex-row items-center border-2 border-primary p-6 rounded-xl max-sm:flex-col">
        <div className="w-full  md:w-2/3 flex flex-col items-start max-sm:w-full">
          <h2 className="text-4xl text-black mb-4 max-sm:text-center">
            Who <span className="mark-zigzag">We</span> Are ?
          </h2>
          <p className="pt-3 text-gray-500">
            EFM is the strongest company for making money online, offering
            unparalleled features and powerful rewards that make it the best
            choice for everyone. We believe in the power of innovation and
            technology and are always striving to provide advanced solutions that
            meet the needs of our clients.
            <br />
            We offer you the opportunity to earn money through simple and
            enjoyable tasks like watching videos and engaging with social media
            channels. These tasks will be your gateway to making money and
            achieving wealth without effort, experience, or significant
            investment.
            <br />
            Moreover, we help companies advertise all their services and products,
            providing them with a large audience of real followers from all over
            the world. Thanks to our well-planned strategies, our clients can
            reach targeted audiences and significantly increase their visibility.
          </p>
        </div>
      </section>

      {/* Company Founder */}
      <section className="mb-12 flex flex-row items-center border-2 border-primary p-6 rounded-xl max-sm:flex-col">
        <div className="w-2/3 flex flex-col items-start max-sm:w-full">
          <h2 className="text-4xl text-black mb-4 max-sm:text-center">
            Company Founder:{" "}
            <span className="mark-zigzag">Eng. Abdulrahman Al-Samary</span>
          </h2>
          <p className="pt-3 text-gray-500">
            Eng. Abdulrahman holds a Bachelor's degree in Software Engineering and
            Computer Science from the UK and has earned accredited certificates
            such as Data Analysis, PMP, DA, and ML. He is the founder of EFM and
            also owns ENG MONEY.
            <br />
            Abdulrahman is an ambitious individual who believes that anyone can
            achieve financial success and works tirelessly to help others reach
            this goal. He is always looking for ways to assist everyone in making
            money online and attaining financial stability.
            <br />
            Drawing from his extensive experience in global financial markets, he
            founded ENG MONEY, which provided unique investment opportunities and
            achieved a profit margin exceeding 280% within just one year of the
            company's establishment.
            <br />
            Following this great success, he continues his series of achievements
            by founding EFM, leveraging his vast expertise in project management
            to create the most powerful marketing and earning company online.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="mb-12 flex flex-row items-center border-2 border-primary p-6 rounded-xl max-sm:flex-col">
        <div className="w-2/3 flex flex-col items-start max-sm:w-full">
          <h2 className="text-4xl text-black mb-4 max-sm:text-center">
            Our <span className="mark">Vision</span> ?
          </h2>
          <p className="pt-3 text-gray-500">
            To be the first genuine online platform that provides passive income
            to all segments of society and helps the largest number of smartphone
            users around the world achieve financial security.
          </p>
        </div>
      </section>

      {/* Our Goals */}
      <section className="mb-12 flex flex-row items-center border-2 border-primary p-6 rounded-xl max-sm:flex-col">
        <div className="w-2/3 flex flex-col items-start max-sm:w-full">
          <h2 className="text-4xl text-black mb-4 max-sm:text-center">
            Our <span className="mark">Goals</span> ?
          </h2>
          <p className="pt-3 text-gray-500">
            To contribute to the shift of the advertising market from
            centralization to decentralization, ending the monopoly of companies
            over advertising profits, and making it a right accessible to as many
            people as possible worldwide, with the simplest resources and lowest
            investments.
          </p>
        </div>
      </section>
</div>
</div>
  </>
}
