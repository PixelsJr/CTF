function Offer({offer, func}) {
	return (
		<div className='offerContainer'>
			<div className="offer" onClick={() => {
				func(offer)
			}}>
				<div className='imgContainer'>
					<img src={offer.image} />
				</div>
				<div className="dataContainer">
					<h1>{offer.name}</h1>
					<p>{offer.description}</p>
					<span>{offer.price}</span>
				</div>
			</div>
		</div>
	);
}

export default Offer;
