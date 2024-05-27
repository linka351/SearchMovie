import { FaGithub } from "react-icons/fa6";

import "./footer.scss";

function Footer() {
	return (
		<div className='footer'>
			<FaGithub className='icon' />
			<a href='https://github.com/linka351'>https://github.com/linka351</a>
		</div>
	);
}

export default Footer;
