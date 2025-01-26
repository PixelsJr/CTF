import Close from "./close";

function Showcase({ offer, close }) {

	if (offer == null) {
		return
	}

	return (
		<div className="showcaseBackground">
			<Close func={close}/>
			<div className='showcase'>
				<div className='imgContainer'>
					<div className="background" style={{ backgroundImage: `url(${offer.image})` }} />
					<img classname="main" src={offer.image} />
				</div>
				<div className="body">
					<h1>{offer.name}</h1>
					<h2>{offer.seller}</h2>
					<p>{offer.description}</p>
                    {/* Reviews Section */}
                    <div className="reviews" style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                        <h3>Reviews</h3>
                        {offer.reviews && offer.reviews.length > 0 ? (
                            offer.reviews.map((review, index) => (
                                <div key={index} className="review">
                                    <p>{review}</p>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
					<button>BUY: {offer.price}€</button>
				</div>
			</div>
		</div>

	);
}

export default Showcase;
