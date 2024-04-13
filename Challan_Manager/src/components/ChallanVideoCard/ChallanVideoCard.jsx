import ReactPlayer from 'react-player'
import React from 'react'
import Button from '../button/Button';
import "./ChallanVideoCard.scss";

function ChallanVideoCard() {
    const handleChallengeClick = () => {
        console.log("Challenge Clicked");
      }
  return (
    <div className="challan">
      <div className="challanimg">
        <img src="https://imgs.search.brave.com/WQmdk3AbP4loUv3GkEKUgqbFGUoRpX4b_m5tNx6WaWU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NjUwNDM2NjY3NDct/NjlmNjY0NmRiOTQw/P3E9ODAmdz0xMDAw/JmF1dG89Zm9ybWF0/JmZpdD1jcm9wJml4/bGliPXJiLTQuMC4z/Jml4aWQ9TTN3eE1q/QTNmREI4TUh4elpX/RnlZMmg4TW54OGRt/Vm9hV05zWlhOOFpX/NThNSHg4TUh4OGZE/QT0.jpeg" alt="car" />
      </div>
      <div className="rightside">
        <div className="rightcontainer">
          <div className="challan__info">
            <span className="challan_id">Challan Number: BT530A1340</span>
            <p>Reason: Red Light Skip</p>
            <p>Location: Ulhasnagar, Thane. 421003</p>
            
          </div>
        </div>
        <div className='video'>
            <ReactPlayer url='https://www.youtube.com/watch?v=LXb3EKWsInQ' />
        </div>

        <hr className="line"/>

        <div className="buttons">
          <Button children="Challenge" onClick= {handleChallengeClick} color ="#ffffff"/>
          <Button children="Pay" onClick = {handleChallengeClick} color= "#100775"/>
        </div>

      </div>
      

    </div>
  );
};

export default ChallanVideoCard
