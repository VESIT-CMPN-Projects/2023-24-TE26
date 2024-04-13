import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../api/axios'
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import Footer from '../../Footer/Footer';
import './VehicleDetailsAdmin.scss'
import CarCard from '../../Police/CarCard/CarCard';
// import Challan from '../ChallanInfoCard/ChallanInfoCard';
import Challan from '../../Police/ChallanInfoCard/ChallanInfoCard';
import Navbar from '../../Navbar/Navbar';
import ChallangedChallan from '../../ChallanInfoCard/ChallengedChallanCard';

const VehicleDetailsAdmin = () => {

    let {vehicleno} = useParams();    

    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [currentTab, setcurrentTab] = useState('pending');
    
    const [pendingChallans, setPendingChallans] = useState([]);
    const [completedChallans, setCompletedChallans] = useState([]);
    const [challengedChallans, setChallengedChallans] = useState([]);
  
    const getVehicleDetails = async () => {
        try {
            const response = await axios.get(`/cars?vehicle=${vehicleno}`);
            setVehicleDetails(response.data[0]);

            const challansResponse = await axios.get(`/challans?vehicle_no=${vehicleno}`);

            // let maxLength = 0;
            // let maxLengthIndex = 0;

            // challansResponse?.data?.forEach((vehicle, index) => {
            //     if(vehicle.challans.length > maxLength){
            //         maxLength = vehicle.challans.length;
            //         maxLengthIndex = index;
            //     }
            // });
            

            setPendingChallans(challansResponse.data[0].pending_challans);
            setCompletedChallans(challansResponse.data[0].completed_challans);
            setChallengedChallans(response?.data[0]?.challenged_challans ?? []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    
    }

    useEffect(() => {
        getVehicleDetails()
    },[]);
  return (
    <>
        <Navbar/>
        <main>
        <h1 className='detail-heading'>Vehicle Details</h1>

        <CarCard data={vehicleDetails}/>
        {/* <hr style={{width: '80%', backgroundColor: 'rgb(30, 30, 101);'}} /> */}
        
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="pending-tab" data-tabs-target="#pending" type="button" role="tab" aria-controls="pending" aria-selected="false" onClick={() => setcurrentTab('pending')}>Pending Challans ({pendingChallans.length})</button>
              </li>
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="completed-tab" data-tabs-target="#completed" type="button" role="tab" aria-controls="completed" aria-selected="false" onClick={() => setcurrentTab('completed')}>Completed Challans ({completedChallans.length})</button>
              </li>
              <li className="me-2" role="presentation">
                  <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="challenged-tab" data-tabs-target="#challenged" type="button" role="tab" aria-controls="challenged" aria-selected="false" onClick={() => setcurrentTab('challenged')}>Challenged Challans ({challengedChallans.length})</button>
              </li>
          </ul>
        </div>
        <div id="default-tab-content">
            <div className={(currentTab==='pending' ? '' : 'hidden ')+"p-4 rounded-lg"} id="pending" role="tabpanel" aria-labelledby="pending-tab">
                {pendingChallans?.length > 0 ? <></> : <h1 className='details-heading'>No Pending Challans Found</h1>}
                <div className='grid' >
                    {pendingChallans?.map((data, index) => (
                        <div className='item'>
                        <Challan key={index} data={data} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={(currentTab==='completed' ? '' : 'hidden ')+"p-4 rounded-lg"} id="completed" role="tabpanel" aria-labelledby="completed-tab">
                {completedChallans?.length > 0 ? <></> : <h1 className='details-heading'>No Completed Challans Found</h1>}
                <div className='grid' >
                    {completedChallans?.map((data, index) => (
                        <div className='item'>
                        <Challan key={index} data={data} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={(currentTab==='challenged' ? '' : 'hidden ')+"p-4 rounded-lg"} id="challenged" role="tabpanel" aria-labelledby="challenged-tab">
                {challengedChallans?.length > 0 ? <></> : <h1 className='details-heading'>No Challenged Challans Found</h1>}
                <div className='view-grid' >
                    {challengedChallans?.map((data, index) => (
                        <div className='item'>
                        <ChallangedChallan key={index} data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </main>
        <Footer/>
    </>
  )
}

export default VehicleDetailsAdmin