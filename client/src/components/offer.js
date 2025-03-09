import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function getPrice(price){
	if(price < 1000) return price
	const re = /\d{3}/g;
	const matches = [...price.toString().matchAll(re)]
	return (matches.join(','))
}


function Offer({ offer, func}) {

	const [loading, setLoading] = useState(0)

	return (
		<div className='offerContainer'>
			<div className="offer borderdDiv" onClick={() => {
				func(offer)
			}}>
				<div className='imgContainer'>
					<img src={offer.image} onLoad={(e)=> {

						setLoading(1)
					}} style={{ opacity: loading, transition: '500ms opacity'}}/>
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
