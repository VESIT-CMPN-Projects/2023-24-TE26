import React from "react";
import "./ChallanInfoCard.scss";
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminChallangedChallan = ({data}) => {
  const navigate = useNavigate();

  const handleAccept = async() => {

    const response = await axios.put(`http://localhost:3000/assets/${data.ChallanNo}`,{
      "carNo": data.CarNo,
      "challanAmount": data.ChallanAmount,
      "reason": data.Reason,
      "owner": "sadhak",
      "proof": data.Proof,
      "status": "accepted"
    })

    console.log(response);

    alert("Challange Accepted");
    navigate('/admin/dashboard');
  }

  const handleReject = async() => {

    const response = await axios.put(`http://localhost:3000/assets/${data.ChallanNo}`,{
      "carNo": data.CarNo,
      "challanAmount": data.ChallanAmount,
      "reason": data.Reason,
      "owner": "sadhak",
      "proof": data.Proof,
      "status": "rejected"
    })

    console.log(response);

    alert("Challange rejected");
    navigate('/admin/dashboard');
  }

  const status = data.Status;
 
  return (
    <div className="challenged-challan">
      <div className="">
        <img src="https://th.bing.com/th/id/OIP.aHJCDqherSksEo42Bqh7lgHaEK?w=300&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="car" />
      </div>
      <div className="rightside flex-column">
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
        <div className="flex justify-end align-end">
          <button type="button" onClick={handleAccept} style={{maxWidth: 'fit-content'}} class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Accept <i class="fa-solid fa-check"></i></button>
          <button type="button" onClick={handleReject} style={{maxWidth: 'fit-content'}} class="float-right text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Reject <i class="fa-solid fa-xmark"></i></button> 
        </div>
      </div>
    </div>
  );
};

export default AdminChallangedChallan;
