import React from "react";
import "./ChallanInfoCard.scss";

const ChallanInfoCard = ({ data }) => {
  return (
    <div className="challan-card">
      <div className="challan-img">
        <img src={data.img} alt="car" />
      </div>
      <div className="right-container">
        <div className="challan-info">
          <p className="challan-id">Challan Number: {data.challan_id}</p>
          <p>Reason: {data.reason}</p>
          <p>Location: {data.location}</p>
          <p className="amount">Amount: Rs. {data.amount}</p>
        </div>
      </div>
    </div>
  );
};

export default ChallanInfoCard;
