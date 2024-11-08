import './CustomerOpinions.css';

const reviews = [
    { name: "hedra", opinion: "Good Company", rating: 3 },
    { name: "hedra", opinion: "Good Company", rating: 3 },
    { name: "hedra", opinion: "Good Company", rating: 3 }
];

const CustomerOpinions = () => {
    return (
        <>

        <div className="opinions-section">
            <h2>Customer opinions</h2>
            <div className="opinions-container">
                {reviews.map((review, index) => (
                    <div key={index} className="opinion-card">
                        <h3>{review.name}</h3>
                        <p>{review.opinion}</p>
                        <div className="stars">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                                <span key={starIndex} className={starIndex < review.rating ? "star filled" : "star"}>★</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        </>
    );
};

export default CustomerOpinions;
