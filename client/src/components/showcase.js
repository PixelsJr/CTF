import Close from "./close";
import { useState, useEffect } from 'react'

function Showcase({ offer, close }) {

    const [newReview, setNewReview] = useState("");
    const [reviews, setReviews] = useState([]);

	useEffect(() => {
        if (offer && offer.reviews) {
            setReviews(offer.reviews);
        }
    }, [offer]);

	//* Ma vihkan seda conditionali
	if (offer == null) {
		return
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/addReview', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ offer_id: offer.id, review: newReview })
        });

        if (response.ok) {
            setReviews([...reviews, newReview]);
            setNewReview("");
        } else {
            alert("Failed to add review");
        }
    };

	return (
		<div className="showcaseBackground">
			<Close func={close}/>
			<div className='showcase'>
				<div className='imgContainer'>
					<div className="background" style={{ backgroundImage: `url(${offer.image})` }} />
					<img className="main" src={offer.image} />
				</div>
				<div className="body">
					<h1>{offer.name}</h1>
					<h2>{offer.seller}</h2>
					<p>{offer.description}</p>
                    {/* Reviews Section */}
                    <div className="reviews" style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                        <h3>Reviews</h3>
                        {offer.reviews && offer.reviews.length > 0 ? ( // TODO: Review ei update dünaamiliselt kui sa ise teed uue review. Et oma reviewd näha peab praegu refreshima.
                            offer.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p dangerouslySetInnerHTML={{ __html: review }} /> //!!! SEE ON VÄGA IMPORTANT LINE PALUN ÄRA MUUDA SEDA
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
					{/* Add Review Form */}
                    <form onSubmit={handleSubmit}>
                        <textarea 
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                            placeholder="Add your review here"
                            required
                        />
                        <button type="submit">Submit Review</button>
                    </form>
					<button>BUY: {offer.price}€</button>
				</div>
			</div>
		</div>

	);
}

export default Showcase;
