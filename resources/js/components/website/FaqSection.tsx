import { Link,usePage } from "@inertiajs/inertia-react";
import Disclosure from "../../components/schema/Disclosure";
import {
  QrCodeIcon,
  QuestionMarkCircleIcon,
  RssIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

const FaqSection = () => {
  const { props } = usePage();
  const faqQuestions = props.faqQuestions;
  return (
    <section
      id="faq"
     style={{ boxShadow: ' 0px 5px 10px #be9e88'}}
     className='container-dark pt-5 pb-10'

    >
      <div className="text-center">
      <h3 className="text-gold max-sm:text-center" style={{ fontSize: '4em'}}>
        {translate('faq.frequently-asked')} <span className="mark-zigzag">{translate('faq.questions')}</span>!
        </h3>
      </div>
      <div className="text-center text-gold">
        {faqQuestions.map((question) => (
          <Disclosure
            key={question.question}
            question={question.question}
            answer={question.answer}
          />
        ))}
        <p className="text-gold px-5 mt-5 text-center">
          {translate('faq.have-more-questions')}
          {/* <Link className="text-primary underline" to={"/contact"}>
            Contact Us
          </Link> */}
        </p>
      </div>
      <div className="faqSection">
        <div className="bg-left" />
        {/* <div className="bg-right" /> */}
        {/* <QrCodeIcon className="w-5 h-5 fn1" />
        <QuestionMarkCircleIcon className="w-5 h-5 fn2" />
        <RssIcon className="w-5 h-5 fn3" />
        <ShareIcon className="w-5 h-5 fn4" /> */}
      </div>
    </section>
  );
};

export default FaqSection;
