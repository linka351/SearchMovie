import { FaHeart } from "react-icons/fa6";

import "./favouritesIcon.scss";

function FavouritesIcon({ classname }) {
	return (
		<div className='icon'>
			<FaHeart className={classname} />
		</div>
	);
}

export default FavouritesIcon;
