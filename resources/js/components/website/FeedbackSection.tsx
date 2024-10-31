import Slider from "react-slick";
import { usePage } from "@inertiajs/inertia-react";
import { translate } from "../../utils/functions";

const FeedbackSection = () => {
  const { props } = usePage();
  const feedbacks = props.feedbacks;
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    // arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
  };
  return (
    <section id="feedbacks" className="h-auto pt-5 container-light"   style={{ boxShadow: ' 0px 5px 10px #be9e88'}} >
      <div className="text-center mb-16">
        <h2 className="text-5xl text-black mb-6 text-center" style={{ fontSize: '4em'}}><span className="mark-zigzag-black">{translate('feedback.our-feedbacks')}</span></h2>
        <p className="text-xl text-black ">
          {translate('feedback.some-of-our-feedbacks')}
        </p>
      </div>
      <Slider
        className="flex items-center  text-black h-[200px] cursor-grab"
        {...settings}
      >
        {feedbacks && feedbacks.length > 0 ? (
          (() => {
            const feedbackElements = [];
            for (let index = 0; index < feedbacks.length; index++) {
              const feedback = feedbacks[index];
              feedbackElements.push(
                <div key={feedback.id || index} className="bg-black rounded-md text-primary px-3 pt-3 pb-1">
                  <div className="silder">
                    <div className="bg-primary w-9 h-10 flex justify-center items-center rounded-md z-10">
                      <img className="w-8 h-8" src={`${props.app_url}/storage/${feedback.image}`} alt={feedback.name} />
                    </div>
                    <h2 className="text-xl">{feedback.name}</h2>
                  </div>
                  <p className="mt-3 text-primary text-center">
                    " {feedback.comment} "
                  </p>
                  <p className="text-black-300 text-sm flex justify-end items-end mt-3 pr-5">
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
