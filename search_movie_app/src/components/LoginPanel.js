import { useUserContext } from "../context/UserContext";

import "../styles/LoginPanel.scss";

function LoginPanel() {
	const { name, error, addToLocalStorage, lockButton, enterUser } =
		useUserContext();
	return (
		<div className='panel-container'>
			<div className='login-panel'>
				<form>
					<label>
						<p>Podaj swoją nazwę aby się zalogować</p>
						<input type='text' value={name} onChange={enterUser} />
						<p className='error'>{error}</p>
						<button onClick={name === "" ? lockButton : addToLocalStorage}>
							Add
						</button>
					</label>
				</form>
			</div>
		</div>
	);
}

export default LoginPanel;
