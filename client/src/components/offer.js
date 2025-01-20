function Offer({offer}) {

	async function openOffer(e){
		e.preventDefault()
		const id = offer.id
		window.href = '/offer'
	}

	return (
		<div className='offerContainer'>
			<div className="offer" onCLick={openOffer}>
				<div className='imgContainer'>
					<img src={offer.image} />
				</div>
				<div className="dataContainer">
					<h1>{offer.name}</h1>
					<p>{offer.description}</p>
					<span>{offer.price}</span>
				</div>
			</div>
		</div>
	);
}

export default Offer;
