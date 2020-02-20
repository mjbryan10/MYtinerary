import React from "react";
import "./landing.scss";

import Header from "./Header";
import StartBrowsing from "./StartBrowsing";
import Login from "../Login";
import Footer from "../footer/Footer";

export default function Landing() {
	return (
		<div className="landing-container">
			<Header />
			<div className="content-wrapper">
				<p>Find your perfect trip, designed by insiders who know and love their cities.</p>
				<StartBrowsing />
				<Login />
			</div>
			<Footer />
		</div>
	);
}
