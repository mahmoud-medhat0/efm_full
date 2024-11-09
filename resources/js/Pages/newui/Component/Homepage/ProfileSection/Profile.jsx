import './Profile.css';
import profile2 from '../../../photo/profilephoto.svg';

const Profile = () => {
  return (
    <>
          

    <div className="profile-container">
     <div className="outer-frame">
                <div className="inner-frame">
                    <img src={profile2} alt="Profile Image" className="profile-image" />
                </div>
            </div>
        <div className="profile-content">
            <h2>Eng/ Abdulrahman AlSemri</h2>
        <h3>EFM & Founder and Owner </h3>
        <p>
          He holds a Bachelor's degree in Software Engineering and Computer Science from the UK, and certified credentials such as Data Analysis, PMP, DA, and ML.
          He is the founder of EFM Company and also the owner of ENG MONEY Company. Engineer Abdulrahman is considered an ambitious person who believes that everyone can achieve financial success, and he works hard to achieve this goal.
        </p>
        <p>
          He always strives to help everyone achieve profit from the internet and reach financial stability. Based on his extensive experience in the global financial markets, he founded ENG MONEY, through which he was able to provide exceptional investment opportunities, and the company achieved profits exceeding 280% within just one year from its establishment.
        </p>
        <p>
          And after this great success, this series of successes continues with the establishment of EFM, benefiting from his extensive experience in project management to achieve his goal of creating the strongest marketing and profit company online.
        </p>
      </div>
    </div>
      </>
  );
};

export default Profile;
