import { useState } from 'react';
import Offer from './offer'


function PurchaseHistory({ offers }) {

	const styleActive = {width: '100%'}
	const styleUnactive = {width: '25%'}

	const [isActive, setIsActive] = useState(false)

	return (
		<div onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}} className='purchaseHistory'>
			<div className='borderdDiv' style={isActive ? styleActive : styleUnactive}>
				<h2>History</h2>
				<div style={{ overflowX: isActive ? 'auto' : 'hidden' }} className='list'>
					{offers.map((offer) =>
						<span key={offer.id}>
							<Offer offer={offer} func={() => { console.log(offer) }} />
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default PurchaseHistory;
