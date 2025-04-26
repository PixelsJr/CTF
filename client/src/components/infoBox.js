function InfoBox({ success, message }) {
	//Component that gives feedback to the user for their actins. "Succesfully created a offer"

	return (
		<div id='infoBox' className="infoBox">
			<div className="borderdDiv">
				<div className="checkMark">
					{success
						? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.62 50.62">
							<path d="M25.31 0c13.98 0 25.31 11.33 25.31 25.31S39.29 50.62 25.31 50.62 0 39.29 0 25.31 11.33 0 25.31 0m-11.2 25.98c.34-1.97 2.59-3.06 4.36-2 .16.1.31.21.46.34l.01.01c.8.76 1.69 1.56 2.57 2.34l.76.68 9-9.44c.53-.55.93-.91 1.73-1.09 2.76-.61 4.7 2.76 2.74 4.83l-11.2 11.76c-1.06 1.13-2.94 1.23-4.08.15-.65-.6-1.36-1.22-2.07-1.84-1.24-1.08-2.5-2.18-3.53-3.26-.63-.61-.89-1.63-.75-2.48"
							style={{
								fillRule: "evenodd",
								clipRule: "evenodd",
								fill: "#6bbe66",
							}} />
						</svg>


						: <svg xmlns="http://www.w3.org/2000/svg" width="122.879" height="122.879" viewBox="0 0 122.879 122.879">
							<path fillRule="evenodd" clipRule="evenodd" fill="#FF4141" d="M61.44 0c33.933 0 61.439 27.507 61.439 61.439s-27.506 61.439-61.439 61.439C27.507 122.879 0 95.372 0 61.439S27.507 0 61.44 0m12.011 39.151a7.01 7.01 0 0 1 9.986-.027c2.764 2.776 2.775 7.292.027 10.083L71.4 61.445l12.076 12.249c2.729 2.77 2.689 7.257-.08 10.022-2.773 2.765-7.23 2.758-9.955-.013L61.446 71.54 49.428 83.728a7.01 7.01 0 0 1-9.986.027c-2.763-2.776-2.776-7.293-.027-10.084L51.48 61.434 39.403 49.185c-2.728-2.769-2.689-7.256.082-10.022s7.229-2.758 9.953.013l11.997 12.165z" />
						</svg>
					}
				</div>
				<span>{message}</span>
			</div>
		</div>
	);
}

export default InfoBox;
