import React, { useState, useEffect } from "react";
import ItineraryCard from "../itineraries/ItineraryCard";
import Spinner from "../global/Spinner";

import { Redirect } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
	resetItineraries,
	fetchItinerariesById as fetchItinerariesByIdAction,
} from "../../store/actions/itineraryActions";

function Favourites(props: any) {
	const {
		token,
		redirect,
		itinSuccess,
		itinLoading,
		itineraries,
		fetchItinerariesById,
		resetItineraries,
	} = props;
	const [favIds, setFavIds] = useState([]);
	const [favPending, setFavPending] = useState(false);
	const [favSuccess, setFavSuccess] = useState(false);
	useEffect(() => {
		resetItineraries();
		async function fetchUserFavourites() {
			setFavPending(true);
			let res = await fetch("https://my-itinerary-demo.herokuapp.com/usersAPI/user/favourites", {
				method: "get",
				headers: {
					"x-api-key": token,
				},
			}).then(res => res.json());

			if (res.success) {
				setFavIds(res.favourites);
				setFavSuccess(true);
			} else {
				setFavIds([]);
				setFavSuccess(false);
			}
			setFavPending(false);
		}
		fetchUserFavourites();
	}, [resetItineraries, token]);
	useEffect(() => {
		if (favIds.length !== 0) {
			console.log("favIds", favIds);
			fetchItinerariesById(favIds);
		}
	}, [favIds, fetchItinerariesById]);

	if (redirect) return <Redirect to="/login" />;

	return (
		<div style={{padding: "1em"}}>
			<h1 style={{ textAlign: "center" }}>Favourites</h1>
			{favPending ? <Spinner /> : null}
			{favSuccess ? (
				<div>
					{itinLoading ? <Spinner /> : null}
					{itinSuccess
						? itineraries.map((itinerary: any) => {
								return <ItineraryCard key={itinerary._id} itinerary={itinerary} />;
						  })
						: null}
				</div>
			) : null}
			{favSuccess && favIds.length === 0 ? (
				<p>
					There appears to be no favourites, try using the heart when browsing through city
					itineraries to add them here.
				</p>
			) : null}
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		token: state.login.token,
		itinSuccess: state.itineraries.success,
		itinLoading: state.itineraries.loading,
		itineraries: state.itineraries.itineraries,
		redirect: state.login.redirect,
	};
};
const mapDispatchToProps = (dispatch: any) =>
	bindActionCreators(
		{
			fetchItinerariesById: fetchItinerariesByIdAction,
			resetItineraries,
		},
		dispatch
	);
export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
