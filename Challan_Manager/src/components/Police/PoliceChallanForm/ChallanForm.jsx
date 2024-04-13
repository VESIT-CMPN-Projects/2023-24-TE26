import React, { useState ,useEffect} from 'react';
import './ChallanForm.scss';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar/Navbar';
import Footer from '../../Footer/Footer';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const ChallanForm = () => {

  const {vehicle_no} = useParams();

  const navigate = useNavigate();
  const [offenseDate, setOffenseDate] = useState('');
  const [offenseLocation, setOffenseLocation] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [offenderMobileNumber, setOffenderMobileNumber] = useState('');
  const [challanFees, setChallanFees] = useState('');
  const [offences, setOffences] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(`/challans?vehicle_no=${vehicle_no}`); 

    let maxLength = 0;
    let maxLengthIndex = 0;

    response?.data?.forEach((vehicle, index) => {
      if(vehicle.challans.length > maxLength){
        maxLength = vehicle.challans.length;
        maxLengthIndex = index;
      }
    });

    const vehicleDetail = response.data[maxLengthIndex]??[];
    const newChallan = {
      "challan_id": Math.random().toString(36).substr(2, 10),
      "reason": offences,
      "location": offenseLocation,
      "amount": challanFees,
      "img": "https://example.com/image1.jpg"
    }

    vehicleDetail.challans.push(newChallan);
    console.log(vehicleDetail);

    const res = await axios.post(`/challans?vehicle_no=${vehicle_no}`, vehicleDetail);

    console.log(res);

    alert('Challan Added Successfully')
    navigate(`/police/dashboard`);
  };
  
  return (
    <>

      <Navbar />
      <div className="challan-form">
        <h2 className="form-heading">Challan Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="offenseDate">Offense Date:</label>
          <input type="date" id="offenseDate" value={offenseDate} onChange={(e) => setOffenseDate(e.target.value)} required />

          <label htmlFor="offenseTime">Offense Location:</label>
          <input type="text" id="offenseLocation" value={offenseLocation} onChange={(e) => setOffenseLocation(e.target.value)} required />

          <label htmlFor="vehicleNumber">Vehicle Number:</label>
          <input type="text" id="vehicleNumber" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} required />

          <label htmlFor="offenderMobileNumber">Offender Mobile Number:</label>
          <input type="tel" id="offenderMobileNumber" value={offenderMobileNumber} onChange={(e) => setOffenderMobileNumber(e.target.value)} required />

          <label htmlFor="challanFees">Challan Fees:</label>
          <input type="number" id="challanFees" value={challanFees} onChange={(e) => setChallanFees(e.target.value)} required />

          <label htmlFor="offences">Offences:</label>
          <textarea id="offences" value={offences} onChange={(e) => setOffences(e.target.value)} required />

          <button type="submit">Submit</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ChallanForm;
