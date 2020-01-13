import { sendRequest } from '../helpers/helpers';

export const loadHomeData = () => {
	return (dispatch) => {
		return sendRequest('/charities')
			.then((res) => {
				dispatch({ type: 'LOAD_HOME_DATA', data: res.data })
			})
			.catch((err) => {
				console.log(err);
			})
	}
};

export const loadPaymentsData = () => {
	return (dispatch) => {
		return sendRequest('/payments')
			.then((res) => {
				dispatch({ type: 'LOAD_PAYMENTS_DATA', data: res.data })
			})
			.catch((err) => {
				console.log(err);
			})
	}
}