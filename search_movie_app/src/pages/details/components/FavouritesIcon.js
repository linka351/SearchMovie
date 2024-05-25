import { FaHeart } from "react-icons/fa6";

import "./favouritesIcon.scss";

function FavouritesIcon({ classname }) {
	return (
		<div className='icon' data-testid='icon'>
			<FaHeart className={classname} data-testid='heart-icon' />
		</div>
	);
}

export default FavouritesIcon;
