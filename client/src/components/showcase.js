import Close from "./close";

function Showcase({ offer, close }) {

	if (offer == null) {
		return
	}

	return (
		<div className="showcaseBackground">
			<Close func={close}/>
			<div className='showcase'>
				<div className='imgContainer'>
					<div className="background" style={{ backgroundImage: `url(${offer.image})` }} />
					<img classname="main" src={offer.image} />
				</div>
				<div className="body">
					<h1>{offer.name}</h1>
					<p>{offer.description}</p>
					<span>{offer.price}</span>
				</div>
			</div>
		</div>

	);
}

export default Showcase;
