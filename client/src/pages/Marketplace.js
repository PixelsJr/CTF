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

        	const offersWithImages = await Promise.all(data.map(async (offer) => {
				if (offer.image) {
                	return offer;
            	}

            	const imageResponse = await fetch(`/api/get_image.php?file_id=${offer.id}`);
				if (imageResponse.ok) {
					// Convert the image to a blob and create an object URL
					const { image, error } = await imageResponse.json();
					if (image) {
                            offer.image = `data:image/jpeg;base64,${image}`;
                    } else {
                            offer.image = ''; 
                    }
				} else {
                	offer.image = '';
            	}
				return offer;
			}));

			setOffers(offersWithImages)
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

		const myFunction = `
      async function buyOffer(id, balance, price) {
        if(price > balance){
			alert('Hello from the custom function!');
			return
		}
		const response = await fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        });

        if(response.ok){
            console.log('Bought: ', id)
        }
        else{
            console.log('Something went wrong: ', id)
        }
      }`


		const script = document.createElement('script')
		script.innerHTML = myFunction;
		document.head.appendChild(script);

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
				<Showcase offer={showcase} close={closeShowcase} balance={finance} />
				<div className='offerList' style={{ opacity: loading, transition: 'opacity 300ms ease-in' }}>
					{offers.map((offer) =>
						<span key={offer.id}>
							<Offer offer={offer} func={showcaseOffer} /> 
							{/* <Offer offer={{ ...offer, image: `/uploads/${offer.image}` }} func={showcaseOffer} /> */}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Marketplace;
