import '../App.css';
import '../components/offer'
import Offer from '../components/offer';
import {useEffect, useState} from 'react'

function Marketplace() {

	const [offers, setOffers] = useState([])

	useEffect(() => {
		async function fetchOffers(){
			const response = await fetch('/api/getAllOffers', {
				method: 'GET'
			})
			const data = await response.json()
			console.log(data)
			setOffers(data)
		}
	})

	return (
		<div className="Marketplace">
			<div className='offerList'>
				{offers.map((offer) =>
					<Offer data={offer} />
				)}
			</div>
		</div>
	);
}

export default Marketplace;
