import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HamMenu = styled.div`
	position: fixed; 
	height: 100vh;
	width: 100%;
	top: 0; 
	left: 0;
	background: rgba(0,0,0,0.4);
	z-index: 1000;
	transition: all .8s ease-in;

	#close-div{
		display: block;
		width: 40%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	nav{
		display: block;
		width: 60%;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		background: white;
		animation: slideIn 0.8s;
	}

	@keyframes slideIn {
		0%{
			right: -100%;
		}
		100%{
			right: 0%;
		}
	}
`;

class Hamburger extends React.Component {

	state = {
		menuOpen: false,
	};

	openMenu() {
		this.setState({ menuOpen: true });
	}

	componentDidMount() {
		const _this = this;
		if (window && window.document) {
			document.getElementById('close-div').addEventListener('click', function () {
				_this.props.closeMenu();
			});
		}
	}

	componentWillUnmount(){
		document.getElementById('close-div').removeEventListener('click', function(){});
	}

	render() {
		const { menuOpen } = this.props;
		return (
			<>
				<HamMenu className={(menuOpen) ? 'visible' : 'hidden'}>
					<div id="close-div"></div>
					<nav></nav>
				</HamMenu>
			</>
		)
	}
}

export default Hamburger;