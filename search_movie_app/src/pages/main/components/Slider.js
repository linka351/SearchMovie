import { useEffect, useState } from "react";
import { MdOutlineNavigateNext, MdNavigateBefore } from "react-icons/md";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import { api, endpoints, apiKey } from "../../../api/api";

import "./slider.scss";
const imageCount = 1;
const IMG_URL = "https://image.tmdb.org/t/p/original/";

function Slider() {
	const [data, setData] = useState([]);
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const isFirstItem = activeItemIndex > 0;
	const isLastItem = activeItemIndex < data.length - 1;

	const nextTrendingMovie = () => {
		setActiveItemIndex(prev => prev + 1);
	};
	const prevTrendingMovie = () => {
		setActiveItemIndex(prev => prev - 1);
	};
	useEffect(() => {
		api
			.get(endpoints.slider + `/all/week?api_key=${apiKey}`)

			.then(data => {
				setData(data.results);
			});
	}, []);

	useEffect(() => {
		const lastIndex = data.length - 1;

		if (activeItemIndex < 0) {
			setActiveItemIndex(lastIndex);
		}

		if (activeItemIndex > lastIndex) {
			setActiveItemIndex(0);
		}

		let slider = setInterval(() => {
			setActiveItemIndex(activeItemIndex + 1);
		}, 5000);

		return () => clearInterval(slider);
	}, [activeItemIndex, data]);

	if (data.length === 0) {
		return (
			<ReactLoading
				className='loader'
				type='spin'
				height={"20%"}
				color='white'
				width={"20%"}
			/>
		);
	}

	return (
		<div className='slider'>
			{data.slice(activeItemIndex, activeItemIndex + imageCount).map(item => {
				return (
						<Link
							key={item.original_title}
							to={`/details/${item.media_type}/${item.id}`}>
							<img alt={item.title} src={`${IMG_URL}${item?.backdrop_path}`} />
							<div className='description-movie'>
								<h2>{item.title || item.name}</h2>
								<p>{item.overview}</p>
							</div>
						</Link>
				);
			})}
			{isFirstItem && (
				<button onClick={prevTrendingMovie} className='btn btn-left'>
					<MdNavigateBefore />
				</button>
			)}
			{isLastItem && (
				<button onClick={nextTrendingMovie} className='btn btn-right'>
					<MdOutlineNavigateNext />
				</button>
			)}
		</div>
	);
}

export default Slider;
