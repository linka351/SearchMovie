import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = "c9de2f7b31706574fa92cef28829a225";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";
//`https://api.themoviedb.org/3/movie/${params}?api_key=${apiKey}&language=en-US`

function Details() {
	const params = useParams();
	const [singleElement, setSingleElement] = useState();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setSingleElement(data);
			});
	}, []);

	console.log(singleElement);

	return (
		<div>
			<p>{singleElement.title}</p>
		</div>
	);
}

export default Details;
