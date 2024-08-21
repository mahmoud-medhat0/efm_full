import Slider from "react-slick";
import { usePage } from "@inertiajs/inertia-react";

const FeedbackSection = () => {
  const { props } = usePage();
  const feedbacks = props.feedbacks;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
  };
  return (
    <section id="feedbacks" className="h-auto mb-32">
      <div className="text-center mb-16">
        <h2 className="text-5xl text-black mb-2">Our Feedbacks!</h2>
        <p className="text-xl text-gray-400">
          Some of our feedbacks from different clients and companies!
        </p>
      </div>
      <Slider
        className="flex items-center text-primary h-[125px] cursor-grab"
        {...settings}
      >
        {feedbacks && feedbacks.length > 0 ? (
          (() => {
            const feedbackElements = [];
            for (let index = 0; index < feedbacks.length; index++) {
              const feedback = feedbacks[index];
              feedbackElements.push(
                <div key={index} className="bg-primary rounded-md text-white px-3 pt-3 pb-1">
                  <div className="silder">
                    <div className="bg-background w-9 h-9 flex justify-center items-center rounded-md z-10">
                      <img className="w-8 h-8" src={`${props.app_url}/storage/${feedback.image}`} alt={feedback.name} />
                    </div>
                    <h2 className="text-xl">{feedback.name}</h2>
                  </div>
                  <p className="mt-3 text-white text-center">
                    " {feedback.comment} "
                  </p>
                  <p className="text-gray-300 text-sm flex justify-end items-end mt-3">
                    {feedback.date}
                  </p>
                </div>
              );
            }
            return feedbackElements;
          })()
        ) : (
          <div>No feedbacks available</div>
        )}
      </Slider>
    </section>
  );
};

export default FeedbackSection;
