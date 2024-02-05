import { useEffect, useState } from "react";
import "../styles/slider.scss";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const apiKey = "c9de2f7b31706574fa92cef28829a225";
const imageCount = 1;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function Slider() {
	const [data, setData] = useState([]);
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const blockNextPageButton = data.length - 1;

	const nextTrendingMovie = () => {
		setActiveItemIndex(prev => prev + 1);
	};
	const prevTrendingMovie = () => {
		setActiveItemIndex(prev => prev - 1);
	};
	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setData(data.results);
			});
	}, []);
	// useEffect(() => {
	// 	setInterval(() => {
	// 		setActiveItemIndex(prev => prev + 1)
	// 	}, 5000);
	// }, []);

	console.log(activeItemIndex);

	if (data.length === 0) {
		return <div>Loading...</div>;
	}
	console.log(data);

	return (
		<>
			<div className='slider'>
				{data.slice(activeItemIndex, activeItemIndex + imageCount).map(item => {
					return (
						<>
							<img alt={item.title} src={`${IMG_URL}${item?.backdrop_path}`} />
							<div className='description-movie'>
								<h2>{item.title || item.name}</h2>
								<p>{item.overview}</p>
							</div>
						</>
					);
				})}
				{activeItemIndex > 0 && (
					<button onClick={prevTrendingMovie} className='btn btn-left'>
						<MdNavigateBefore />
					</button>
				)}
				{activeItemIndex < blockNextPageButton && (
					<button onClick={nextTrendingMovie} className='btn btn-right'>
						<MdOutlineNavigateNext />
					</button>
				)}
			</div>
		</>
	);
}

export default Slider;
