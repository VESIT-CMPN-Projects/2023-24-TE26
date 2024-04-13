import React from "react";
import "./ChallanInfoCard.scss";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "../button/Button";

const Challan = ({data, isPending=true}) => {
  console.log(data)
  const navigate = useNavigate();
  const handleChallengeClick = () => {
    console.log("Challenge Clicked");
    // navigate("/challenge");
  }
  const handlePayClick = () => {
    console.log("Pay Clicked");
  }
  return (
    <div className="challan">
      <div className="">
        <img src={data.img} alt="car" />
      </div>
      <div className="rightside">
        <div className="rightcontainer px-4">
          <div className="challan__info">
            <span className="challan_id">Challan Number: {data.challan_id}</span>
            <p className="mb-2">Reason: {data.reason}</p>
            <p className="mb-2">Location: {data.location}</p>
            
          </div>
          
          <div className="amount mt-4">Amount: Rs. {data.amount}</div>
          
        </div>

      {isPending && <>
        <hr className="line"/>

        <div className="buttons">
          <Link to="/challenge" state={data}>
            <Button children="Challenge" onClick= {handleChallengeClick} color ="#ffffff"/>
          </Link>
          
          <Button children="Pay" onClick = {handlePayClick} color= "#100775"/>
        </div>
      </>}
      </div>
      
    </div>
  );
};

export default Challan;
