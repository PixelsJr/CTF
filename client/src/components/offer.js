function Offer({offer}) {
	return (
		<div className='offerContainer'>
			<div className="offer">
				<div className='imgContainer'>
					<img src={offer.image} />
				</div>
				<h1>{offer.name}</h1>
			</div>
		</div>
	);
}

export default Offer;
