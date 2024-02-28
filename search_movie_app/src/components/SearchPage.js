import { Link } from "react-router-dom";
import "../styles/searchPage.scss";

function SearchPage() {
	return (
		<>
			<p className='search-question'>What are you looking for?</p>
			<div className='search-box'>
				<Link className='link' to={"/searchMovies"}>
					<p>Search Movies</p>
				</Link>
				<Link className='link' to={"/searchTvSeries"}>
					<p>Search Tv Series</p>
				</Link>
			</div>
		</>
	);
}

export default SearchPage;
