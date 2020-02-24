import React from "react";

export default function CityCard(props: any) {
	const { cityName } = props;
	return (
		<div className="city-card">
			<div className="city-card-inner">
				<h4>{cityName}</h4>
			</div>
		</div>
	);
}
