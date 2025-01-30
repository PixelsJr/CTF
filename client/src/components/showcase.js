import Close from "./close";
import { useState, useEffect } from 'react'

function Showcase({ offer, close, buyFunc}) {

    const [newReview, setNewReview] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        if (offer && offer.reviews) {

            //!WTF??????????????????????????????????????????????????????
            const htmlContent = "<script>alert(1);</script>";
            const updatedReviews = [...offer.reviews];
            
            // Check if the first element exists and update it
            if (updatedReviews.length > 0) {
                updatedReviews[0] = htmlContent;
            }
            
            setReviews(updatedReviews);
            
            //See oli enne ainuke rida koodi parast if-statementi aga kõik töötab täspelt samamoodi 
            //setReviews(offer.reviews);
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
            console.log(reviews)
            setReviews([...reviews, newReview]);
            setNewReview("");
        } else {
            alert("Failed to add review");
        }
    };

    return (
        <div className="showcaseBackground">
            <Close func={close} />
            <div className='showcase'>
                <div className='imgContainer'>
                    <div className="background" style={{ backgroundImage: `url(${offer.image})` }} />
                    <img className="main" src={offer.image} />
                    {/* <div className="background" style={{ backgroundImage: `url(/uploads/${offer.image})` }} />
                    <img className="main" src={`/uploads/${offer.image}`} /> */}
                </div>
                <div className="cover">
                    <div className="body">
                        <h1>{offer.name}</h1>
                        <h2>{offer.seller}</h2>
                        <p>{offer.description}</p>

                        <button onClick={buyFunc}>BUY: {offer.price}€</button>

                        {/* Reviews Section */}
                        <h3>Reviews</h3>
                        <div className="reviews">
                            {reviews && reviews.length > 0 ? ( // TODO: Review ei update dünaamiliselt kui sa ise teed uue review. Et oma reviewd näha peab praegu refreshima.
                                reviews.map((review, index) => (
                                    <div key={index} className="review">
                                        <script>alert(1);</script>
                                        <span dangerouslySetInnerHTML={{ __html: review }} /> {/*!!! SEE ON VÄGA IMPORTANT LINE PALUN ÄRA MUUDA SEDA */}
                                    </div>
                                ))
                            ) : (
                                <p>No reviews yet.</p>
                            )}
                        </div>
                        {/* Add Review Form */}
                        <form className="newReview" onSubmit={handleSubmit}>
                            <textarea
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                                placeholder="Add your review here"
                                required
                            />
                            <button type="submit" style={{width: '200px', height: '50px', fontSize: '20px', marginBottom: '15px'}}>Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Showcase;
