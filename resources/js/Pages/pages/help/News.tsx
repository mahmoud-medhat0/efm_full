import NewsCards from "../../../components/cards/NewsCards";
import RootLayout from "../../../layout";
import { usePage } from "@inertiajs/inertia-react";

const NewsPage = () => {
  const { props } = usePage();
  const news = props.news;
  return (
    <RootLayout>
    <main className="w-full h-full my-20 container pt-20">
      <div className="mb-2">
        <h2 className="text-4xl text-black mb-4">
          Latest <span className="mark-zigzag">Announcements / News</span>
        </h2>
      </div>
      <div className="w-full py-20">
        <div className="flex flex-col justify-between items-center gap-y-6">
          {news && news.length > 0 && news.map((news) => (
            <NewsCards
              date={news.date}
              time={news.time}
              message={news.title}
              description={<div dangerouslySetInnerHTML={{ __html: news.description }} />}
            />
          ))}
          {news && news.length === 0 && (
            <div className="w-full h-full flex justify-center items-center">
              <h2 className="text-2xl text-gray-500">No news found</h2>
            </div>
          )}
        </div>
      </div>
    </main>
    </RootLayout>
  );
};

export default NewsPage;
