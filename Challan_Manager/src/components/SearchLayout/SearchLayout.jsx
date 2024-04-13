import React from 'react'
import { useSelector } from 'react-redux'
import { getRadio } from '../../features/Search/SearchSlice';
import VehicleChallan from '../VehicleChallan/VehicleChallan'
import ChallanNoSearch from '../ChallanNoSearch/ChallanNoSearch';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './SearchLayout.scss'

function SearchLayout() {
    
    const search = useSelector(getRadio)
  return (
    <>
        <Header/>
        {search === 'vehicle' ? <VehicleChallan/> : <ChallanNoSearch/>}
        <div className='box'>

        </div>

    </>
  )
}

export default SearchLayout