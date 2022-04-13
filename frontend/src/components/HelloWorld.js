import React, { useState } from 'react';
import Modal from 'react-modal';

function HelloWorld() {
	const [showModal, setShowModal] = useState(false);
	const [result, setResult] = useState(null);
	//const [deviceId, setdeviceId] = React.useState("");

	const persons = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E" }

	const myJSON = JSON.stringify(persons);

	const handleOpenModal = () => {
		setShowModal(true);
		//window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));
		//window.backend.memmetric("com.android.chrome").then((result) => setResult(result));
		// window.backend.gpuMetric("com.android.chrome").then((result) => setResult(result));
		//window.backend.Uploaddata("com.android.chrome").then((result) => setResult(result));
		//window.backend.AndroidDownloadedData1("com.android.chrome").then((result) => setResult(result));
		//window.backend.AndroidCPUCores1("com.android.chrome").then((result) => setResult(result));
		//window.backend.powermetric("com.android.chrome").then((result) => setResult(result));
		//window.backend.Apppowermetric("com.android.chrome").then((result) => setResult(result));
		//window.backend.cpuarch("com.android.chrome").then((result) => setResult(result));


		//window.backend.startscan("com.android.chrome", "true").then((result) => setResult(result));
		// setTimeout(function () { //Start the timer
		// 	window.backend.startscan(myJSON, "false").then((result) => {
		// 		const data = JSON.parse(result)
		// 		//setdeviceId(data.data.session_id)
		// 		const persons1 = { "appname": "com.google.android.play.games", "id": "1", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoidmluYXlAZ21haWwuY29tIiwidXNlcl9yb2xlIjoidXNlciIsInVzZXJfaWQiOjIzLCJpYXQiOjE2NDk3MDk3NDl9.ZsLXUGiTpUqQRUvYEcRzDsh5iWl4pVmoNSWm1HvWN3E", "session_id": data.data.session_id }
		// 		const myJSON1 = JSON.stringify(persons1);

		// 		setResult(myJSON1)
		// 		setTimeout(function () { //Start the timer
		// 			window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));

		// 			setTimeout(function () { //Start the timer
		// 				//window.backend.cpumetric("com.android.chrome").then((result) => setResult(result));
		// 				// setTimeout(function () { //Start the timer
		// 				window.backend.stopscan(myJSON1, "false").then((result) => setResult(result));


		// 			}.bind(this), 4000)
		// 		}.bind(this), 4000)

		// 		// data.data.map((e) => {
		// 	console.log(e.session_id)

		// })






		// }.bind(this), 40000)


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
