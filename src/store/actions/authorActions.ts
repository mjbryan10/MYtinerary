export const FETCH_AUTHORS_REQUEST = "FETCH_AUTHORS_REQUEST";
export const FETCH_AUTHORS_SUCCESS = "FETCH_AUTHORS_SUCCESS";
export const FETCH_AUTHORS_FAILURE = "FETCH_AUTHORS_FAILURE";

export function fetchAuthorsRequest(): object {
	return {
		type: FETCH_AUTHORS_REQUEST,
	};
}
export function fetchAuthorsSuccess(authors: [object]): object {
	return {
		type: FETCH_AUTHORS_SUCCESS,
		payload: authors,
	};
}
export function fetchAuthorsFailure(error: string): object {
	return {
		type: FETCH_AUTHORS_FAILURE,
		payload: error,
	};
}

export function fetchAuthors(authorId: string) {
	return (dispatch: any) => {
		dispatch(fetchAuthorsRequest());
		fetch(`http://localhost:5000/authors/${authorId}`) //TODO: NOT YET ROUTED
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					throw res.erorr;
				}
				dispatch(fetchAuthorsSuccess(res));
			})
			.catch(err => dispatch(fetchAuthorsFailure(err.message)));
	};
}
