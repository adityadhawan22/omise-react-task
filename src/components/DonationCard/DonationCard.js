import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled(Link)`
	background: #FFFFFF;
	text-decoration: none;
	border: 1px solid #EEEEEE;
	box-sizing: border-box;
	border-radius: 10px;
	width: 100%;
	margin: 10px 0px;


	@media screen and (min-width: 728px){
		width: 48%;
	}

	h1{
		color: #020517;
		font-size: 18px;
		font-family: 'Gilroy';
		margin: 10px 0;
	}

	.text-section{
		width: 90%;
		margin: 0 auto;
	}

	p{
		font-size: 12px;
		color: #555555;
		margin: 0px 0px;
		line-height: 140%;
	}

	img{
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
`;

const DonateNow = styled.div`
	background: #F6AD32;
	color: #020517;
	border-radius: 10px;
	width: 100%;
	text-align: center;
	font-size: 15px;
	font-family: 'Gilroy';
	margin: 10px auto;
	padding: 10px;
	box-sizing: border-box;
`;

class DonationCard extends React.Component {

	render() {
		const { name, image, description, id } = this.props;
		return (
			<>
				<Card to={`/charity/${id}`}>
					<img src={image} />
					<div className="text-section">
						<h1>{ name }</h1>
						<p>{ description }</p>
						<DonateNow>Donate Now</DonateNow>
					</div>
				</Card>
			</>
		)
	}
}

export default DonationCard;