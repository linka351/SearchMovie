import { useEffect, useState } from "react";
import "../styles/slider.scss";

//zdjęcia https://image.tmdb.org/t/p/w500
const apiKey = "c9de2f7b31706574fa92cef28829a225";
const imageCount = 1
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';


function Slider() {
	const [data, setData] = useState([]);
    const [activeItemIndex, setActiveItemIndex] = useState(0)

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setData(data.results);
			});
	}, []);
   
    if (data.length === 0) {
        return <div>Loading...</div>;
      }
    
      return (
        <>
          <div>
            {data.slice(activeItemIndex, activeItemIndex + imageCount).map((item) => (
                <img alt='' src={`${IMG_URL}${item?.backdrop_path}`} />
            ))}
    
          </div>
        </>
      )

	
}

export default Slider;
