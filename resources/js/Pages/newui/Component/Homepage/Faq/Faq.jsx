import { useState } from 'react';
import './Faq.css';
import { ChevronUpIcon } from '@heroicons/react/16/solid';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

const faqData = [
    { question: "How to start?", answer: "You can start by signing up on our platform and completing the registration process. Once registered, you’ll have access to all the tools and resources to help you get started." },
    { question: "What is EFM?", answer: "EFM is a leading online platform that provides opportunities for individuals to earn money by completing simple tasks and interacting with various services. Our goal is to empower users with innovative ways to increase their income." },
    { question: "What is EFM Vision?", answer: "EFM's vision is to be a pioneer in providing passive income opportunities to people from all backgrounds and to make earning money online accessible to everyone globally." },
    { question: "What are EFM Services?", answer: "EFM offers a range of services that allow members to earn money through various activities such as watching videos, engaging with social media, participating in surveys, and more." },
    { question: "What are the promotions on the occasion of the company's opening?", answer: "To celebrate our opening, we are offering special promotions for new members, including discounts on membership fees and exclusive earning opportunities for early adopters." },
    { question: "What are the benefits offered by EFM membership?", answer: "EFM members enjoy exclusive benefits such as access to a wide range of earning opportunities, training resources, customer support, and potential discounts on future services." },
    { question: "How does efmhub.com work?", answer: "EFMHub.com is a user-friendly platform where members can register and access a variety of tasks. Members complete these tasks to earn rewards, which can be redeemed or withdrawn based on our terms." },
    {
        question: "Who is the founder of EFM?",
        answer: "The founder of the company is Engineer Abdulrahman Al-Samri, who holds a Bachelor's degree in Software Engineering and Computer Science from the UK and has extensive experience in global financial markets."
    },
    { question: "What are EFM Goals?", answer: "Our goals include revolutionizing the online earning industry, creating accessible income opportunities for all, and supporting businesses in reaching a global audience through digital engagement." },
    { question: "What is the competition launched by EFM?", answer: "EFM is launching a competition where members can participate by completing specific tasks to earn points. Top participants will receive exciting prizes and rewards." },
    { question: "How can members earn money through EFM?", answer: "Members can earn money through EFM by participating in activities such as watching videos, sharing content, filling out surveys, and promoting EFM services to others." },
    { question: "What is the strategic partnership between ENG MONEY and EFM?", answer: "The strategic partnership between ENG MONEY and EFM aims to combine expertise in financial services and digital earning solutions, providing users with a secure and efficient way to earn and manage their income online." }
]

    


const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <>
            <h2 style={{ textAlign: 'center', color: 'black' ,fontSize:'29px',fontWeight:'bold' }}>FAQ</h2>
            <div className="faq-container">
                {faqData.map((item, index) => (
                    <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                        <div className="faq-question" onClick={() => toggleAnswer(index)}>
                            {item.question}
                            {activeIndex === index ? (
                                <ChevronUpIcon className="icon-faq"  />
                            ) : (
                                <ChevronDownIcon className="icon-faq" />
                            )}
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="section-divider"></div>
        </>
    );
};

export default Faq;