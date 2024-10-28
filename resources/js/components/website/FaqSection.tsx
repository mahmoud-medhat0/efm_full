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
     
    >
      <div className="text-center  font-bold">
      <h3 className="text-2xl text-black max-sm:text-center  ">
        Frequently <span className="mark-zigzag">Asked</span> Questions!
        </h3>
      </div>
      <div className="text-center">
        {faqQuestions.map((question) => (
          <Disclosure
            key={question.question}
            question={question.question}
            answer={question.answer}
          />
        ))}
        <p className="text-black px-5 mt-5">
          Have more questions?{" "}
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
