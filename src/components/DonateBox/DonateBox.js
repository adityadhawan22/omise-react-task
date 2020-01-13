import React from 'react';
import styled from 'styled-components';


const HomeWrapper = styled.div`
	margin: 0 auto;
	width: 89%;

	@media screen and (min-width: 768px){
		width: 60%;
	}
`;


const Heading2 = styled.h2`
  font-family: 'Gilroy';
  font-size: 18px;
  color: #555555;
`;

const DonatePill = styled.label`  
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  font-family: 'Gilroy';
  border: ${props => props.selected ? '1px solid #F6AD32' : '1px solid #eee'};;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;

  @media screen and (min-width: 728px) {
    width: 49%;
  }
`;


const Wrapper = styled.div`

  .container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 22px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
  }
  .container:hover input ~ .checkmark {
    background-color: #ccc;
  }
  .container input:checked ~ .checkmark {
    background-color: #F6AD32;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .container input:checked ~ .checkmark:after {
    display: block;
  }
  .container .checkmark:after {
    top: 6px;
    left: 6px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
  }
`;

const TextLabel = styled.div`
  position: absolute;
  left: 45px;
  top: 11px;
`;

const DonatePillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const PayNowButton = styled.button`
  outline: 0;
  border: 0px;
  background: #F6AD32;
  padding: 9px;
  width: 100%;
  border-radius: 10px;
  font-family: 'Gilroy';
  font-size: 17px;
  margin: 10px 0px;
`;

const ThankYou = styled.div`
  background: green;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  color:white;
  font-family: 'Gilroy';
  animation: slide-up 0.7s;

  @keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

`;


class DonateBox extends React.Component {

  state = {
    donateItems: [50, 100, 150, 200],
    selectedItem: null,
    donated: false,
  };

  handleChange(e) {
    this.setState({ selectedItem: e.target.value });
  }

  getSelectedItem = (item) => {
    const { selectedItem } = this.state;
    if (item == selectedItem)
      return true;
    return false;
  }

  pay = () => {
    const { selectedItem } = this.state;
    const { charityId, addPayment } = this.props;

    if (!selectedItem) {
      alert("Please select a donation amount! ");
      return;
    }
    addPayment(charityId, selectedItem, 'TBH', this.showPopup);
  }

  showPopup = () => {
    this.setState({ donated: true });
  }

  render() {
    const { selectedItem, donateItems, donated } = this.state;

    return (
      <>
        <Wrapper>
          <Heading2>
            Donate Now
          </Heading2>
          {
            !donated &&
            <DonatePillWrapper>
              {
                donateItems.map((item) => {
                  return (
                    <DonatePill key={item} selected={this.getSelectedItem(item)} for={item}>
                      <label className="container">
                        <input name="test" onChange={(e) => { this.handleChange(e) }} id={item} value={item} className="checkbox" type="radio" />
                        <span class="checkmark"></span>
                      </label>
                      <TextLabel> TBH {item} </TextLabel>
                    </DonatePill>
                  )
                })
              }
              <PayNowButton onClick={() => { this.pay() }}>Pay Now</PayNowButton>
            </DonatePillWrapper>
          }

          {
            donated &&
            <ThankYou>
              Thank you for donating!
            </ThankYou>
          }
        </Wrapper>

      </>
    )
  }
}

export default DonateBox;