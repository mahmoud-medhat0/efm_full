import FaqCards from "../../../components/cards/FaqCards";
import RootLayout from "../../../layout";
import { usePage } from "@inertiajs/inertia-react";

const FaqPage = () => {
  const page = usePage();
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container pt-20">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          Frequently Asked <span className="mark-zigzag">Questions</span>
        </h2>
      </div>
      <div className="w-full pb-20">
        <div className="w-full flex flex-col justify-between items-start">
          {page.props.faqQuestions.map((faq) => (
            <FaqCards
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        </div>
      </main>
    </RootLayout>
  );
};

export default FaqPage;
