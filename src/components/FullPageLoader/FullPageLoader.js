import React from 'react';
import styled from 'styled-components';

const Loader = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    background:  ${props => props.transparent ? 'rgba(255,255,255,0.5)' : 'white'}; ;
    top:0;
	.lds-ripple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    }
    .lds-ripple div {
    position: absolute;
    border: ${props => '4px solid' + props.theme.themeColor1};
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
    }
    @keyframes lds-ripple {
    0% {
        top: 36px;
        left: 36px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    100% {
        top: 0px;
        left: 0px;
        width: 72px;
        height: 72px;
        opacity: 0;
    }
    }

`;

class FullPageLoader extends React.Component {
    render() {
        const { transparent } = this.props;
        return (
            <Loader transparent={transparent}>
                <div className="lds-ripple"><div></div><div></div></div>
            </Loader>
        )
    }
}

export default FullPageLoader;