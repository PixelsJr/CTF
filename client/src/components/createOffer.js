import { useState } from "react";

function CreateOffer({ }) {

	const [title, setTitle] = useState(null)
	const [description, setDescription] = useState(undefined)
	const [price, setPrice] = useState(undefined)
	const [picture, setPicture] = useState(undefined)


	async function createOfferRequest(e) {
		e.preventDefault()

		console.log(picture)

		const message = {
			'name': title, 'description': description,
			'price': price, 'image': picture
		}

		const response = await fetch('/api/createOffer', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(message)
		})
	}


	//Very simple create offer. Currently all inputs accept all types of values.
	return (
		<form onSubmit={createOfferRequest} className="createOffer borderdDiv">
			<h2>Create offer</h2>
			<div className="body">
				<h3>Name of the offer</h3>
				<input onChange={(e) => { setTitle(e.target.value) }} placeholder="Dog for sale..."></input>
				<h3>Description</h3>
				<input onChange={(e) => { setDescription(e.target.value) }} placeholder="This is a dog I am trying to get rid of..."></input>
				<h3>Picture</h3>
				<input onChange={(e) => { setPicture(e.target.value) }} placeholder="https://dolt.ee/api/gallery?img=busDog.jfif"></input>
				<img src={picture}></img>
				<div className="priceBox">
					<span>Price:</span>
					<input onChange={(e) => { setPrice(e.target.value) }} placeholder="5"></input><span>€</span>
				</div>
				<button type="submit">Create Offer</button>
				<div style={{height: '10px'}}></div>
			</div>
		</form>
	);
}

export default CreateOffer;
