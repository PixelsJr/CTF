function UserData({ data }) {

	data.purchases = []

	return (
		<div className='userData'>
			<div></div>
			<h1>Welcome, {data.username}!</h1>
			<h2>Money: {data.money}€</h2>
			<div>

				{data.purchases.map((purchase, key) =>
					<div key={key}>
						<p>{purchase}</p>
					</div>
				)}

			</div>
		</div>
	);
}

export default UserData;
