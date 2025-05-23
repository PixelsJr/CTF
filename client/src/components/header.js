import { LogoutButton } from '../components/logout';

function Header({cash}) {
	//Comonent for the header. Has the page links and logout buttton.


	return (
		<div className='header'>
			<div style={{width: '20%'}}>

			</div>
			<div>
				<a href="/">
					<svg viewBox="0 0 24 24" fill="#FFF">
						<path d="M8.99 23H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053s-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006S3.025 5.98 4.416 4.938L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977C10.294.803 11.092.5 12 .5s1.707.303 2.537.786c.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119zM7.8 4.9l-2 1.5C4.15 7.638 3.61 8.074 3.317 8.658 3.025 9.242 3 9.937 3 12v4c0 1.442.002 2.424.101 3.159.095.706.262 1.033.485 1.255.223.223.55.39 1.256.485.734.099 1.716.1 3.158.1V14.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5V21c1.443 0 2.424-.002 3.159-.101.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.256.099-.734.101-1.716.101-3.158v-4c0-2.063-.025-2.758-.317-3.342-.291-.584-.832-1.02-2.483-2.258l-2-1.5c-1.174-.881-1.987-1.489-2.67-1.886C12.87 2.63 12.425 2.5 12 2.5s-.87.13-1.53.514C9.788 3.411 8.975 4.019 7.8 4.9M14 21v-6.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21z" />
					</svg>
				</a>
				<a href="/Profile">
					<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M10 0c5.514 0 10 4.486 10 10s-4.486 10-10 10S0 15.514 0 10 4.486 0 10 0zm6.24 15a7.99 7.99 0 01-12.48 0 7.99 7.99 0 0112.48 0zM10 10a3 3 0 100-6 3 3 0 000 6z" fill="#FFF" />
					</svg>

				</a>
			</div>
			<div style={{width: '20%', justifyContent: 'space-between'}}>
				<LogoutButton />
			</div>
		</div>
	);
}

export default Header;
