import React, { useState, useEffect } from "react";
import CityCard from "./CityCard";
import Spinner from "../global/Spinner";

import "./cities.scss";

export default function Cities() {
	const [searchStr, setSearchStr] = useState("");
	const [hasLoaded, setHasLoaded] = useState(false);
	const [isFetchingCities, setIsFetchingCities] = useState<boolean>(false);
	const [cities, setCities] = useState<any>({});
	const fetchCities = () => {
		setHasLoaded(false);
		fetch("http://localhost:5000/cities/all")
			.then(response => response.json())
			.then(result => {
				setCities(result);
				setHasLoaded(true);
			})
			.catch(e => console.log(e));
	};
	const handleChange = (e: any) => {
		e.preventDefault();
		setSearchStr(e.target.value);
		// props.onChange(e.target.value);
	};
	function filterCities(): any {
		let filtered = cities.filter((city: any) => {
			return city.name.toLowerCase() === searchStr.toLowerCase()
		});
		if (filtered.length) {
			return filtered
		} else {
			return cities
		}
	}
	useEffect((): void => {
		fetchCities();
	}, []);
	return (
		<div className="cities-container">
			<h1>Cities</h1>
			{hasLoaded ? (
				<div className="cards-container">
					<input
						type="text"
						placeholder="Search for a city.."
						value={searchStr}
						onChange={handleChange}
					/>
					{filterCities().map((city: any, index: number) => (
						<a href={"/" + city.name}>
							<CityCard className="city-card" cityName={city.name} key={index} />
						</a>
					))}
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
}
