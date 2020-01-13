const initialState = {
	charities: [],
	payments: [],
	loader: false,
};

export default function home(state = initialState, action) {
	const newState = {...state};
	switch (action.type) {
		case "LOAD_HOME_DATA":
			newState.charities = action.data;
			return newState;
		case "LOAD_PAYMENTS_DATA": 
			newState.payments = action.data;
			return newState;
		case "ADD_PAYMENT":
			newState.loader = false;
			newState.payments = newState.payments.concat(action.data);
			return newState;
		case "PAYMENT_LOADER": 
			newState.loader = true;
			return newState;
		default:
			return state;
	}
}

