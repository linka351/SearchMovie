import { useEffect, useState } from "react";
import "../styles/Movies.scss";
import { apiKey, IMG_URL } from "../imageApiKeys";

function Movies() {
	return (
		<>
			<div className='buttons-direction'>
				<button onClick={takeToPreviousPage}>Prev</button>
				<p>{`Page ${currentPage}/${totalPages}`}</p>
				<button onClick={takeToNextPage}>Next</button>
			</div>
			<div className='movie-page'>
				{data.map(item => {
					return (
						<div className='image'>
							<img
								onClick={() => {}}
								src={`${IMG_URL}${item.backdrop_path}`}
								alt={item.title}
							/>
							<div className='movie-description'>
								<p>{item.title}</p>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default Movies;
