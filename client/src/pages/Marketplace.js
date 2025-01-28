import '../App.css';
import Offer from '../components/offer';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import Showcase from '../components/showcase';

function Marketplace() {

	const [offers, setOffers] = useState([])
	const [showcase, setShowcase] = useState(null)

	const [finance, setFinance] = useState(0)

	const [loading, setLoading] = useState(0);


	useEffect(() => {
		async function fetchOffers() {
			const response = await fetch('/api/getAllOffers', {
				method: 'GET'
			})
			const data = await response.json()
			console.log(offers)
			setOffers(data)
			console.log(offers)
			setLoading(1);
		}

		async function fetchUserData() {
            //const response = await fetch(`/api/Profile?user_id=${userId}`, {
            const response = await fetch('/api/Profile', {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setFinance(data.money);
            }
        }
		fetchOffers()
		fetchUserData()
	}, [])

	function closeShowcase() {
		setShowcase(null)
	}

	function showcaseOffer(offer) {
		setShowcase(offer)
	}

	return (
		<div className="Marketplace">
			<Header cash={finance} />
			<div className='scrollable'>
				<Showcase offer={showcase} close={closeShowcase} balance={finance}/>
				<div className='offerList' style={{opacity: loading, transition: 'opacity 300ms ease-in'}}>
					{offers.map((offer) =>
						<span key={offer.id}>
							<Offer offer={offer} func={showcaseOffer} />
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Marketplace;
