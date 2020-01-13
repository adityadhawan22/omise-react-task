import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Hamburger from './Hamburger';

const NavBar1 = styled.div`
	display: flex;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid #f3f3f3;
`;

const HomeWrapper = styled.div`
	margin: 0 auto;
	width: 89%;

	@media screen and (min-width: 768px){
		width: 60%;
	}
`;

const LogoImage = styled.img`
	display: block;
	width: 120px;	
`;

const HamBurger = styled.div`
	position: absolute;
	right: 5%;
`;

class NavBar extends React.Component {
	
	state = {
		menuOpen: false,
	};

	openMenu(){
		this.setState({ menuOpen: true });
	}

	closeMenu(){
		this.setState({ menuOpen: false });
	}

	componentDidMount(){
		if(window && window.doucment){
			document.body.addEventListener('click', function(){
				debugger;
			});
		}
	}

	render() {
		const { menuOpen } = this.state; 
		return (
			<>
				<HomeWrapper>
					<NavBar1 id="nav-bar">
						<Link to="/">
							<LogoImage alt="VisaSquare Logo" src="/assets/img/logo.svg" />
						</Link>
						<HamBurger onClick={ () => { this.openMenu() }}><img alt="Hamburger Icon" src="/assets/img/hamburger.svg" /></HamBurger>
					</NavBar1>
				</HomeWrapper>
				{
					menuOpen &&
					<Hamburger menuOpen={menuOpen} closeMenu={this.closeMenu.bind(this)}/>
				}
			</>
		)
	}
}

export default NavBar;