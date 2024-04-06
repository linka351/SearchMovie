import { useState } from "react";

import { useUserContext } from "../context/UserContext";

import "../styles/LoginPanel.scss";

function LoginPanel() {
	const { addToLocalStorage } = useUserContext();
	const [value, setValue] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = e => {
		e.preventDefault();
		if (value === "") {
			setError("Proszę podać nazwę użytkownika!");
			return;
		}
		addToLocalStorage(value);
		setError("");
	};

	return (
		<div className='panel-container'>
			<div className='login-panel'>
				<form onSubmit={handleSubmit}>
					<label>
						<p>Podaj swoją nazwę aby się zalogować</p>
						<input type='text' value={value} onChange={e=>setValue(e.target.value) } />
						<p className='error'>{error}</p>
							<button>Add</button>
					</label>
				</form>
			</div>
		</div>
	);
}

export default LoginPanel;
