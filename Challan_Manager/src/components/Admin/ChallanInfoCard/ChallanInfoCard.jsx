import React from "react";
import "./ChallanInfoCard.scss";
import "@fontsource/poppins";
import { Link } from "react-router-dom";

const Challan = ({data}) => {
  return (
    <div className="police_challan">
      <Link to = {`${data.vehicle}`}>
      <div className="challanimg">
        <img src={data.img} alt="car" />
      </div>
      <div className="rightcontainer">
        <div className="challan__info">
          <p className="challan_id">Vehicle Number: {data.vehicle}</p>
          <p>Owner: {data.owner}</p>
          <p>Contact: {data.contact}</p>
          <p>Company: {data.make}</p>
          <p>Model: {data.model}</p>
          <p>Color: {data.color}</p>
          <p className="amount">Chassis No: {data.chassis_no}</p>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default Challan;
