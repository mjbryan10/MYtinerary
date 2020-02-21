import React, { useState, useEffect } from "react";

export default function Cities() {
	const [isFetchingCities, setIsFetchingCities] = useState<boolean>(false);
	const [cities, setCities] = useState<any>({});
	const fetchCities = () => {
		setIsFetchingCities(true);
		fetch("http://localhost:5000/cities/all")
			.then(response => response.json())
			.then(result => {
				setIsFetchingCities(false);
				setCities(result);
			})
			.catch(e => console.log(e));
	};

    useEffect((): void => {
        fetchCities();
    }, []);
	return (
		<div>
			<h1>Cities</h1>
            {(isFetchingCities) ? <p>Loading...</p> : null }
		</div>
	);
}
