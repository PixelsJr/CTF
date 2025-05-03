import { useState } from 'react';
import Offer from './offer'


function PurchaseHistory({ offers }) {

	//Contains the purchase history of the user. All offers purchased successfully will be displayed here.
	const styleActive = {width: '100%'}
	const styleUnactive = {width: '35%'}

	const [isActive, setIsActive] = useState(false)

	return (
		<div onMouseEnter={() => {setIsActive(true)}} onMouseLeave={() => {setIsActive(false)}} className='purchaseHistory'>
			<div className='borderdDiv' style={isActive ? styleActive : styleUnactive}>
				<h2>History</h2>
				<div style={{ overflowX: isActive ? 'auto' : 'hidden' }} className='list'>
					{offers.map((offer, key) =>
						<span key={key}>
							<Offer offer={offer} func={() => console.log('a')}/>
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default PurchaseHistory;
