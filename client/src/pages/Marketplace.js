import '../App.css';
import Offer from '../components/offer';
import { useEffect, useState } from 'react'
import Header from '../components/header';
import Showcase from '../components/showcase';
import InfoBox from '../components/infoBox';

function Marketplace() {

	const [offers, setOffers] = useState([])
	const [showcase, setShowcase] = useState(null)
	const [finance, setFinance] = useState(0)
	const [loading, setLoading] = useState(0);

	const [infoBoxMessage, setInfoBoxMessage] = useState('');
    const [infoBoxSuccess, setInfoBoxSuccess] = useState(false);

	useEffect(() => {
		async function fetchOffers() {

			const response = await fetch('/api/getAllOffers', {
				method: 'GET'
			})
			const data = await response.json()
			console.log(offers)

        	const offersWithImages = await Promise.all(data.map(async (offer) => {
				if (offer.image) {
					console.log(offer.image)
                	return offer;
            	}

				const filename_response = await fetch(`/api/get_offer_filename_from_id?offer_id=${offer.id}`, {
					method: 'GET'
				});
				//const filename = await filename_response.json().filename
				const filename_json = await filename_response.json()
				console.log(filename_json)
				const filename = filename_json.filename
				console.log(filename)

            	const imageResponse = await fetch(`/api/get_image.php?filename=${filename}`);
				console.log(imageResponse)
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
			return false
		}
		const response = await fetch('/api/buy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'id': id})
        });

        if(response.ok){
            return true
        }
        else{
            return false
        }
      }`


		const script = document.createElement('script')
		script.innerHTML = myFunction;
		document.head.appendChild(script);

		fetchOffers()
		fetchUserData()
	}, [])

	async function buyRequest(e){
        e.preventDefault()

		const offer = showcase


        if(await window.buyOffer(offer.id, finance, offer.price)){
			successBox('Successfully bought!', true)
		} else {
			successBox('Something went wrong!', false)
		}
    }

	async function informationBox(obj, message, success, delay=2000){

		function timeout(delay) {
			return new Promise( res => setTimeout(res, delay) );
		}

        const infoBoxObj = obj
        infoBoxObj.style.display = 'flex'

        setInfoBoxSuccess(success)
        setInfoBoxMessage(message)

        infoBoxObj.style.display = 'flex'

        await timeout(delay);
        infoBoxObj.style.opacity = 0
        await timeout(500);
        infoBoxObj.style.zIndex = -100
        await timeout(500);
        infoBoxObj.style.display = 'none'
		infoBoxObj.style.opacity = 1
		infoBoxObj.style.zIndex = 100
    }

	async function successBox(message, state){
        const infoBoxObj = document.getElementById('infoBox')
		informationBox(infoBoxObj, message, state, 2000)
    }

	function closeShowcase() {
		setShowcase(null)
	}

	function showcaseOffer(offer) {
		setShowcase(offer)
	}

	return (
		<div className="Marketplace">
			<Header cash={finance} />
			<InfoBox message={infoBoxMessage} success={infoBoxSuccess}/>
			<div className='scrollable'>
				<Showcase offer={showcase} close={closeShowcase} balance={finance} buyFunc={buyRequest}/>
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
