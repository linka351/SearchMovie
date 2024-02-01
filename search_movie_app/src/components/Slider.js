import { useEffect, useState } from "react";
import "../styles/slider.scss";

//zdjęcia https://image.tmdb.org/t/p/w500
const apiKey = "c9de2f7b31706574fa92cef28829a225";

function Slider() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setData(data.results);
			});
	}, []);
    console.log([...data, {}]);
	

	return (
		<>
			<div>
				{data.map(image => {
					return (
						<>
							<img
								key={image.id}
								src={`//image.tmdb.org/t/p/w500${image.backdrop_path}`}
							/>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Slider;
