const initialState = {
    charityData: [],
};

export default function charity(state = initialState, action) {
	const newState = {...state};
	switch (action.type) {
		case "LOAD_CHARITY_DATA":
			newState.charityData = action.data;
            return newState;
        case "RESET_CHARITY":
            return initialState;
		default:
			return state;
	}
}

