import { sendRequest } from '../helpers/helpers';

export const loadCharityData = (id) => {
	return (dispatch) => {
		return sendRequest('/charities/' + id)
			.then((res) => {
				dispatch({ type: 'LOAD_CHARITY_DATA', data: res.data })
			})
			.catch((err) => {
				console.log(err);
			})
	}
};

export const resetCharity = (id) => {
	return (dispatch) => {
		dispatch({ type: 'RESET_CHARITY' })
	}
};


export const addPayment = (id, amount, currency = "TBH", showPopup) => {
	return (dispatch) => {

		dispatch({ type: 'PAYMENT_LOADER' });

		let params = {
			method: 'POST',
			data: { "charitiesId": id, "amount": parseInt(amount), "currency": currency },
		}
		return sendRequest('/payments', params)
			.then((res) => {
				setTimeout(() => {
					dispatch({ type: 'ADD_PAYMENT', data: res.data });
					showPopup();
				}, 1500);
			})
			.catch((err) => {
				console.log(err);
			})

	}
}



