import '../App.css';
import '../components/offer'
import Offer from '../components/offer';

function Marketplace() {
	return (
		<div className="Marketplace">
			<div className='offerList'>
				<Offer />
				<Offer />
				<Offer />
				<Offer />
			</div>
		</div>
	);
}

export default Marketplace;
