import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Details() {
	const params = useParams();
	const [singleElement, setSingleElement] = useState([]);

	useEffect(() => {});

	return (
		<div>
			<p>Details</p>
		</div>
	);
}

export default Details;
