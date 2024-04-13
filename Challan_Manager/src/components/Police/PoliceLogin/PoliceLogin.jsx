import React from 'react'
// import { useSelector } from 'react-redux'
// import { getRadio } from '../../../features/Search/SearchSlice';
// import VehicleChallan from '../../VehicleChallan/VehicleChallan'
// import ChallanNoSearch from '../../ChallanNoSearch/ChallanNoSearch';
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import PoliceForm from './PoliceForm/PoliceForm';
import './PoliceLogin.scss'

function PoliceLogin() {
    
  return (
    <>
        <Header/>
        <PoliceForm/>
        <div className='box'>

        </div>

    </>
  )
}

export default PoliceLogin