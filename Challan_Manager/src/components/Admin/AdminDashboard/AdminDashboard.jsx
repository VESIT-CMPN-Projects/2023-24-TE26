import React,{useEffect,useState} from 'react'
import Footer from '../../Footer/Footer'
import Challan from '../ChallanInfoCard/ChallanInfoCard'
import "./AdminDashboard.scss";
import axios from '../../../api/axios'
import Navbar from '../../Navbar/Navbar';
import AdminChallangedChallan from '../ChallanInfoCard/AdminChallengedChallanCard';
// import axios from 'axios'

const AdminDashboard = () => {

  const [currentTab, setcurrentTab] = useState('cars');

  const [allCars, setAllCars] = useState([])
  const [challengedChallans, setChallengedChallans] = useState([])
  const [searchedCars, setSearchedCars] = useState('')

  useEffect(() => {
  const getData = async () => {
    try {
      // const response = await axios.get('/');
      // const responseObject = response;
      // setAllCars(responseObject);
      // console.log(responseObject);

      await axios.get('/cars')
      .then((response) => {
        console.log(response.data);
        setAllCars(response.data);
      }).catch((error) => {
        console.error('Error fetching data:', error);
      })

      // await axios.get('/challanged_challans')
      // .then((response) => {
      //   console.log(response.data);
      //   setChallengedChallans(response.data);
      // }).catch((error) => {
      //   console.error('Error fetching data:', error);
      // })

      const response = await axios.get('http://localhost:3000/assets');
      setChallengedChallans(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
    getData();
    
  },[])

  const handleChange = (e) => {
    setSearchedCars(e.target.value);
  }

  const filterCars = allCars.filter((car) => {
    return car.vehicle.toLowerCase().includes(searchedCars.toLowerCase());
  })
  return (
    <>
      <Navbar />
      <main>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                <li className="me-2" role="presentation">
                    <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="cars-tab" data-tabs-target="#cars" type="button" role="tab" aria-controls="cars" aria-selected="false" onClick={() => setcurrentTab('cars')}>Cars ({allCars.length})</button>
                </li>
                <li className="me-2" role="presentation">
                    <button className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="challenged-tab" data-tabs-target="#challenged" type="button" role="tab" aria-controls="challenged" aria-selected="false" onClick={() => setcurrentTab('challenged')}>Challenged Challans ({challengedChallans.length})</button>
                </li>
            </ul>
        </div>
        
        <div className="police_container">
          <div id="default-tab-content">
              <div className={(currentTab==='cars' ? '' : 'hidden ')+"p-4 rounded-lg"} id="cars" role="tabpanel" aria-labelledby="cars-tab">
                <form className="vehicle-number-input" onChange={handleChange}>
                  <input
                    type="text"
                    value={searchedCars}
                    id="searchByVehicleNumber"
                    name="searchByVehicleNumber"
                    placeholder='Search by Vehicle Number'
                  />
                </form>
                <div className='grid'>
                  {searchedCars.length != 0 ? filterCars.length != 0 ? filterCars.map((data, index) => (
                    <div className='item'>
                      <Challan key={index} data={data} />
                    </div>)
                  ) : <h2>No Vehicle Found</h2> : allCars.map((data, index) => (
                    <div className='item'>
                      <Challan key={index} data={data} />
                    </div>)
                  )}
                </div>
              </div>
              
              <div className={(currentTab==='challenged' ? '' : 'hidden ')+"p-4 rounded-lg"} id="challenged" role="tabpanel" aria-labelledby="challenged-tab">
                <div className='view-grid'>
                  {challengedChallans.length != 0 ? challengedChallans.map((data, index) => (
                    <div className='item mb-4'>
                      <AdminChallangedChallan key={index} data={data} />
                    </div>)
                  ) : <h2>No Challenged Challans Found</h2>
                  }
                </div>
              </div>
            
          </div>
        
        </div>
      </main>
      <Footer />
    </>

  )
}

export default AdminDashboard