import React from 'react';
import styled from 'styled-components';
import * as styles from '../../helpers/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../actions/home';
import { Link } from 'react-router-dom';
import DonationCard from '../../components/DonationCard/DonationCard';

const HomeWrapper = styled.div`
	margin: 0 auto;
	width: 89%;

	@media screen and (min-width: 768px){
		width: 60%;
	}
`;

const TotalDonations = styled.div`
	background: #F8F9FB;
	width: 100%;
	height: 45px;
	color: #020517;
	border-radius: 10px;
	position: relative;
	padding: 0px 20px;
	box-sizing: border-box;
	margin-top: 20px;

	p{
		position: absolute;
		font-size: 12px;
		font-family: 'Gilroy';
		font-weight: bold;
		text-transform: uppercase;
		position: absolute;
		margin: 0;
		top: 50%;
		transform: translate(0%,-50%);
	}

	h1{
		font-size: 23px;
		font-family: 'Gilroy';
		font-weight: bold;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(-20%,-50%);
		margin: 0;
	}
`;

const DonationWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 10px;
`;

class Home extends React.Component {
	componentDidMount() {
		const { loadHomeData, loadPaymentsData } = this.props;
		loadHomeData();
		loadPaymentsData();
	}

	static fetchData(store, params={}) {
		console.log("Inside Home");
		return Promise.all([store.dispatch(homeActions.loadHomeData()),
			store.dispatch(homeActions.loadPaymentsData()),
		]);
	}


	render() {
		const { home } = this.props;
		let totalPayments = null;

		// Calcuate the total amount paid
		if( home && home.payments ){
			 home.payments.map((item) => {
				totalPayments += parseInt(item.amount);
			})
		}

		return (
			<>
				<HomeWrapper>
					<TotalDonations>
						<p> Total Donation </p>
						<h1> TBH {totalPayments} </h1>
					</TotalDonations>
					<DonationWrapper>
						{
							home && home.charities && home.charities.length > 0 &&
							home.charities.map((item, index) => {
								return <DonationCard key={index} {...item} />
							})
						}
					</DonationWrapper>
				</HomeWrapper>
			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home,
	}
}

const actions = {
	...homeActions,
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);