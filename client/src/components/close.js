function Close({ func }) {
	//Component that has the X svg. The svg that is used for closing the offer showcase.
	return (
		<div className="close" onClick={() => {func()}}>
			<svg fill="#fff" height="200" width="200" viewBox="261.275 261.775 1269.75 1269.45" stroke="#fff"><g strokeWidth="0"/><g strokeLinecap="round" strokeLinejoin="round"/><path d="m1082.2 896.6 410.2-410c51.5-51.5 51.5-134.6 0-186.1s-134.6-51.5-186.1 0l-410.2 410L486 300.4c-51.5-51.5-134.6-51.5-186.1 0s-51.5 134.6 0 186.1l410.2 410-410.2 410c-51.5 51.5-51.5 134.6 0 186.1 51.6 51.5 135 51.5 186.1 0l410.2-410 410.2 410c51.5 51.5 134.6 51.5 186.1 0 51.1-51.5 51.1-134.6-.5-186.2z"/></svg>
		</div>

	);
}

export default Close;
