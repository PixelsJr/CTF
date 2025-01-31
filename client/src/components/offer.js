function getPrice(price){
	if(price < 1000) return price
	const re = /\d{3}/g;
	const matches = [...price.toString().matchAll(re)]
	return (matches.join(','))
}


function Offer({ offer, func }) {

	return (
		<div className='offerContainer'>
			<div className="offer borderdDiv" onClick={() => {
				func(offer)
			}}>
				<div className='imgContainer'>
					<img src={offer.image} />
				</div>
				<div className="dataContainer">
					<h1>{offer.name}</h1>
					<p>Seller: {offer.seller}</p>
					<p>Price: {getPrice(offer.price)}€</p>
				</div>
			</div>
		</div>
	);
}

export default Offer;
