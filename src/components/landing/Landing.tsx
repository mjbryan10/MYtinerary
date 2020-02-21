import React from "react";
import "./landing.scss";
import Destinations from './Destinations';

import Header from "./Header";
import StartBrowsing from "./StartBrowsing";

export default function Landing() {
	return (
		<div className="landing-container">
			<Header />
			<div className="content-wrapper">
				<p>Find your perfect trip, designed by insiders who know and love their cities.</p>
				<StartBrowsing />
				<Destinations />
			</div>
		</div>
	);
}
