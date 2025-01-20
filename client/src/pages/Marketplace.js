import '../App.css';
import '../components/offer'
import Offer from '../components/offer';
import {useEffect, useState} from 'react'
import Header from '../components/header';

function Marketplace() {

	const [offers, setOffers] = useState([])

	useEffect(() => {
		async function fetchOffers(){
			const response = await fetch('/api/getAllOffers', {
				method: 'GET'
			})
			console.log(response)
			const data = await response.json()
			console.log(data)
			setOffers(data)
		}
		fetchOffers()
	})

	return (
		<div className="Marketplace">
			<Header />
			<div className='offerList'>
				{offers.map((offer) =>
					<Offer offer={offer} />
				)}
			</div>
		</div>
	);
}

export default Marketplace;
