import React,{ useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import './PoliceForm.scss'
import Button from '../../../button/Button';
// import RadioButtonSearch from '../../RadioButtonSearch.jsx/RadioButtonSearch';
import { useNavigate } from 'react-router';

function PoliceForm() {
  const navigate = useNavigate();
  
  const [userName, setUserName] = useState('');
  const [organisationName, setOrganistaionName] = useState('');
  

    const handleSubmit = () => {

      if(userName === '' || organisationName === ''){
        alert('Please fill all the fields');
        return;
      }
      console.log("pressed");
      navigate('/police/dashboard');
    };
  
    return (
      <div className='root'>
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                type="text"
                id="userName"
                name="userName"
                placeholder='Enter Usename'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                />
            </div>

            <div className="input-group">
                
                <input
                type="text"
                id="organisationName"
                name="organisationName"
                placeholder='Enter Organisation name'
                value={organisationName}
                onChange={(e) => setOrganistaionName(e.target.value)}
                required
                />
            </div>

            <div className='recaptcha'>
                <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
                />
            </div>
            
            <Button children ='Submit' onClick = {handleSubmit} color = '#1C3AA9'/>
            </form>
        </div>
      </div>
      
      
    );
}

export default PoliceForm