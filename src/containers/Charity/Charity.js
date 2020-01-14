import React from 'react';
import styled from 'styled-components';
import * as styles from '../../helpers/styles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as homeActions from '../../actions/home';
import * as charityActions from '../../actions/charity';
import { Link } from 'react-router-dom';
import DonateBox from '../../components/DonateBox/DonateBox';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader';


const HomeWrapper = styled.div`
	margin: 0 auto;
	width: 89%;

	@media screen and (min-width: 768px){
		width: 60%;
	}
`;

const CharityWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	img {
			width: 100%;

		@media screen and (min-width: 768px){
			max-height: 300px;
			object-fit: cover;
		}	
	
	}
`;

const Content = styled.div`
    width: 100%;
    background: white;
    border-radius: 30px;
    margin-top: -70px;
    min-height: 100px;

    p{
		font-size: 12px;
		margin: 0;
		color: #888;
	}

	h1{
		font-size: 23px;
		font-family: 'Gilroy';
		font-weight: bold;
	}
`;

const InfoPillWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px 0px;
`;

const InfoPill = styled.div`
	width: 49%;
	box-sizing: border-box;
	background: ${props => props.color ? props.color : '#eee'};
	font-family: 'Gilroy';
	text-align: center;
	border-radius: 14px;
	padding: 10px 0px;

	h1{
		font-size: 30px;
		color: #020517;
		margin: 0;
	}

	p{
		font-size: 16px;
		color: ${props => props.color ? '#fff' : '#888888'} ;
	}

`;

const BottomLine = styled.div`
	border-bottom: 2px solid #eee;
	width: 100%;
	height: 1px;
`;



class Charity extends React.Component {

	static fetchData(store, params = {}) {
		let url = params.url;
		let items = url.split("/");
		let slug = items[items.length - 1];

		console.log("Inside Charity", slug);
		return Promise.all([store.dispatch(charityActions.loadCharityData(slug)),
			store.dispatch(homeActions.loadPaymentsData()),
		]);
	}

	componentDidMount() {
		const { match, loadCharityData, loadPaymentsData, resetCharity } = this.props;
		resetCharity();
		loadCharityData(match.params.id);
		loadPaymentsData();
	}

	render() {
		const { charity, home, addPayment } = this.props;
		let totalPayments = null;
		let lastPayment = null;

		if (charity && charity.charityData.length === 0) {
			return <FullPageLoader />
		}

		// Calcuate the total amount paid
		if (home && home.payments && home.payments.length > 0
			&& charity && charity.charityData && charity.charityData.id) {
			home.payments.map((item) => {
				if (item.charitiesId === charity.charityData.id)
					totalPayments += parseInt(item.amount);
			})

			lastPayment = home.payments.filter((item) => { return item.charitiesId === charity.charityData.id });
			lastPayment = lastPayment.reverse();
		}

		return (
			<>

				{home && home.loader &&
					<FullPageLoader transparent={true}/>
				}
				{charity && charity.charityData && charity.charityData.name &&
					<CharityWrapper>
						<img src={charity.charityData.image} />
						<Content>
							<HomeWrapper>
								<h1> {charity.charityData.name} </h1>
								<p>{charity.charityData.description}</p>
								<InfoPillWrapper>
									<InfoPill>
										<h1>TBH {totalPayments ? totalPayments : '-'}</h1>
										<p> Total Donations </p>
									</InfoPill>
									<InfoPill color="#F6AD32">
										<h1>TBH {(lastPayment && lastPayment[0]) ? lastPayment[0].amount : "-"}</h1>
										<p> Last Donation </p>
									</InfoPill>
								</InfoPillWrapper>

								<BottomLine />
								<DonateBox addPayment={addPayment} charityId={charity.charityData.id} />

							</HomeWrapper>
						</Content>

					</CharityWrapper>

				}

			</>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		home: state.home,
		charity: state.charity,
	}
}

const actions = {
	...homeActions,
	...charityActions,
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Charity);