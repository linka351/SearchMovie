import { useState } from "react";
import "../styles/LoginPanel.scss";

const addInitial = () => {
	const saved = localStorage.getItem("name");
	const initialValue = JSON.parse(saved);
	return initialValue || "";
};

function LoginPanel() {
	const [name, setName] = useState(addInitial);
	const [error, setError] = useState("");
	const addToLocalStorage = () => {
		localStorage.setItem("name", JSON.stringify(name));
	};

	const lockButton = e => {
		e.preventDefault();
		setError("Proszę podać nazwę użytkownika!");
	};

	return (
		<div className='panel-container'>
			<div className='login-panel'>
				<form>
					<label>
						<p>Podaj swoją nazwę aby się zalogować</p>
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<p className='error'>{error}</p>
						{name === "" ? (
							<button onClick={lockButton}>Add</button>
						) : (
							<button onClick={addToLocalStorage}>Add</button>
						)}
					</label>
				</form>
			</div>
		</div>
	);
}

export default LoginPanel;
