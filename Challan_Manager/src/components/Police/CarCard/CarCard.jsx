import React from "react";
import "./CarCard.scss";
import "@fontsource/poppins";

const CarCard = ({ data }) => {
  return (
    <div className="challan">
      <div className="challanimg">
        <img src={data.img} alt="car" />
      </div>
      <div className="rightside">
        <div className="rightcontainer">
          <div className="challan__info">
            <p className="vehicle-info">Vehicle: {data.vehicle}</p>
            <p className="vehicle-info">Color: {data.color}</p>
            <p className="vehicle-info">Model: {data.make} {data.model}</p>
            <p className="vehicle-info">Chassis: {data.chassis_no}</p>
            <p className="vehicle-info">Owner: {data.owner}</p>
            <p className="vehicle-info">Contact: {data.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
