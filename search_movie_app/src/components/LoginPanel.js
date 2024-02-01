import { useState } from "react";
import "../styles/LoginPanel.scss";

const addInitial = () => {
	const saved = localStorage.getItem("name");
	const initialValue = JSON.parse(saved);
	return initialValue || "";
};

function LoginPanel() {
	const [name, setName] = useState(addInitial)
	const addToLocalStorage = () => {
		localStorage.setItem("name", JSON.stringify(name));
	};

	return (
		<div className='panel-container'>
			<div className='login-panel'>
				<form>
					<label>
						Proszę podaj swoje imię
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
						/>
						<button onClick={addToLocalStorage}>Add</button>
					</label>
				</form>
			</div>
		</div>
	);
}

export default LoginPanel;
