import React from "react";
import "./ChallanInfoCard.scss";
import "@fontsource/poppins";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ChallangedChallan = ({data}) => {
  const status = data.Status;
  const navigate = useNavigate();
  return (
    <div className="challan">
      <div className="">
        <img src="https://th.bing.com/th/id/OIP.aHJCDqherSksEo42Bqh7lgHaEK?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="car" />
      </div>
      <div className="rightside">
        <div className="rightcontainer px-4">
          <div className="challan__info text-left">
            <span className="challan_id">Challan Number: {data.ChallanNo}</span>
            {status === 'accepted' && <span class="font-bold mx-2 px-2.5 py-0.5 my-4 rounded-full bg-green-600 text-white">Accepted</span>}
            {status === 'rejected' && <span class="font-bold mx-2 px-2.5 py-0.5 my-4 rounded-full bg-red-600 text-white">Rejected</span>}
            {status === 'waiting' && <span class="font-bold mx-2 px-2.5 py-0.5 my-4 rounded-full bg-yellow-400 text-white">Pending</span>}
            <p className="mb-2">Reason: {data.Reason}</p>
            <p className="mb-2">Location: Mumbai</p>
            <p className="mb-2">Proof Description: {data.Proof}</p>
          </div>
          <div className="amount mt-4">Amount: Rs. {data.ChallanAmount}</div>
          
        </div>
      </div>
    </div>
  );
};

export default ChallangedChallan;
