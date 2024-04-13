import React, { useState } from 'react'
import Footer from '../../Footer/Footer'
import Challan from '../ChallanInfoCard/ChallanInfoCard'
import Navbar from '../../Navbar/Navbar'
import "./PoliceDashboard.scss";
import { Link } from 'react-router-dom'
import Button from '../../button/Button'
import axios from '../../../api/axios';
import CarCard from '../CarCard/CarCard';
import { useNavigate } from 'react-router-dom';

const PoliceDashboard = () => {

  const navigate = useNavigate();
  const[challans, setChallans] = useState(null);
  const[car, setCar] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const vehicleNo = evt.target[0].value;
    const responseChallans = await axios.get(`/challans?vehicle_no=${vehicleNo}`);

    let maxLength = 0;
    let maxLengthIndex = 0;
    responseChallans?.data?.forEach((vehicle, index) => {
      if(vehicle?.challans?.length??0 > maxLength){
        maxLength = vehicle.challans.length;
        maxLengthIndex = index;
      }
    });

    setChallans(responseChallans?.data[maxLengthIndex]?.challans??null);
    const responseCar = await axios.get(`/cars?vehicle=${vehicleNo}`);
    setCar(responseCar?.data[0]??null);
  }

  const handleAddChallan = () => {
    if(car){
      navigate(`/police/dashboard/challanform/${car.vehicle}`);
    }else{
      alert('Please enter a valid vehicle number')
    }
  }
  
  return (
    <>
        <Navbar />
        <main>
          <div className="police_container">
            <form className="vehicle-number-input" onSubmit={evt=>handleSubmit(evt)}>
                <input
                  type="text"
                  id="searchByVehicleNumber"
                  name="searchByVehicleNumber"
                  placeholder='Search by Vehicle Number'
                />
            </form>
            <div>
              {car ? <CarCard data={car} /> : <h1>No Vehicle Found</h1> }
            </div>
            { car && (challans ? <h1>Challans Found: {challans.length}</h1> : <h1>No Challans Found</h1>) }
            <div className='grid'>
              {challans && challans.map((data, index) => (
                <div className='item'>
                  <Challan key={index} data={data} />
                </div>)
              )}
            </div>
              <div className="add-challenge-button">
                  <Button children="Add Challan" onClick={handleAddChallan} color ="#100775"/>
              </div>
          </div>
        </main>
        <Footer />
    </>

  )
}

export default PoliceDashboard