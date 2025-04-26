import { useState } from "react";

function CreateOffer({ successBox }) {

	//Component that is responsible for creating the offer. Name, price, image, description

	const [title, setTitle] = useState(null)
	const [description, setDescription] = useState(undefined)
	const [price, setPrice] = useState(undefined)
	const [imageOption, setImageOption] = useState("url");  // Option to choose between 'url' or 'file'
	const [picture, setPicture] = useState(null);
	const [imageUrl, setImageUrl] = useState("");


	async function createOfferRequest(e) {
		//Posts the data to the server
		e.preventDefault()

		const formData = new FormData();
		formData.append("name", title);
		formData.append("description", description);
		formData.append("price", price);

		if (imageOption === "file" && picture) {
			formData.append("image", picture);
		} else if (imageOption === "url" && imageUrl) {
			formData.append("image", imageUrl);
		}

		/*
		const message = {
			name: title,
			description: description,
			price: price,
			image: imageOption === "file" ? picture : imageUrl, // Send either file or url depending on choice ig? idk i don't really get this
		};
		*/


		const response = await fetch("/api/createOffer", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			successBox('Offer created successfully!', true)
			console.log("Offer created successfully");
		} else {
			successBox('Something went wrong!', false)
			console.error("Error creating offer");
		}
	}


	//Very simple create offer. Currently all inputs accept all types of values.
	return (
		<form onSubmit={createOfferRequest} className="createOffer borderdDiv">
			<h2>Create offer</h2>
			<div className="body">
				<h3>Name of the offer</h3>
				<input onChange={(e) => { setTitle(e.target.value) }} maxLength='30' required placeholder="Dog for sale..."></input>
				<h3>Description</h3>
				<input onChange={(e) => { setDescription(e.target.value) }} placeholder="This is a dog I am trying to get rid of..."></input>
				<h3>Picture</h3>
				{/* Radio buttons to choose image source */}
				<label style={{marginRight: '40px'}}>
					<input
						type="radio"
						name="imageOption"
						value="url"
						checked={imageOption === "url"}
						style={{width: '20px'}}
						onChange={() => setImageOption("url")}
						placeholder="https://dolt.ee/api/gallery?img=busDog.jfif"
					/>
					Enter Image URL
				</label>
				<label>
					<input
						type="radio"
						name="imageOption"
						value="file"
						checked={imageOption === "file"}
						style={{width: '20px'}}
						onChange={() => setImageOption("file")}
					/>
					Upload Image
				</label>
				{/* Conditional rendering based on image option */}
				{imageOption === "url" && (
					<input
						type="text"
						onChange={(e) => setImageUrl(e.target.value)}
						value={imageUrl}
						placeholder="https://dolt.ee/api/gallery?img=busDog.jfif"
					/>
				)}

				{imageOption === "file" && (
					<>
						<input
							type="file"
							accept="image/*"
							onChange={(e) => setPicture(e.target.files[0])}
						/>
						{picture && (
							<img
								src={URL.createObjectURL(picture)}
								alt="Preview"
								style={{ maxWidth: "200px", marginTop: "10px" }}
							/>
						)}
					</>
				)}
				<div className="priceBox">
					<span>Price:</span>
					<input type="number" required onChange={(e) => { setPrice(e.target.value) }} placeholder="5"></input><span>€</span>
				</div>
				<button type="submit">Create Offer</button>
				<div style={{ height: '10px' }}></div>
			</div>
		</form>
	);
}

export default CreateOffer;
