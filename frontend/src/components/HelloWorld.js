import React, { useState } from 'react';
import Modal from 'react-modal';

function HelloWorld() {
	const [showModal, setShowModal] = useState(false);
	const [result, setResult] = useState(null);
	const persons = { "email": "gm@gmail.com", "password": "password" }
	const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk0MDc4ODd9.YQsWxeju9g1XcG5o4zmWOyVS4LR6kO2YVccHMpovIZo" }

	const myJSON = JSON.stringify(persons);
	const myJSON1 = JSON.stringify(persons1);

	const handleOpenModal = () => {
		setShowModal(true);
		//window.backend.powermetric("com.android.chrome").then((result) => setResult(result));

		//window.backend.startscan("com.android.chrome", "true").then((result) => setResult(result));
		//window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));

		window.backend.stopscan(myJSON1, "false").then((result) => setResult(result));


		//window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));

		// window.backend.basiconfo(myJSON1).then((result) => {
		// 	setResult(result)
		// 	alert(result)
		// });
		//window.backend.mylogin(myJSON).then((result) => setResult(result));
		//window.backend.getlogin().then((result) => setResult(result));

	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<div className="App">
			<button onClick={() => handleOpenModal()} type="button">
				Scan
			</button>
			<Modal
				appElement={document.getElementById("app")}
				isOpen={showModal}
				contentLabel="Minimal Modal Example"
			>
				<p>{result}</p>
				<button onClick={() => handleCloseModal()}>Close Modal</button>
			</Modal>
		</div>
	);
}

export default HelloWorld;
