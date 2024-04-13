import React, { useState,useCallback } from 'react';
import Button from '../button/Button';
import "@fontsource/poppins";
import "./UploadProofCard.scss";
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import {getVehicleNo, getChassisNo} from '../../features/Search/SearchSlice'

const UploadProofCard = ({data}) => {
    const vehicleNo = useSelector(getVehicleNo);

    const navigate = useNavigate();
    console.log(data);
  const [proofFiles, setProofFiles] = useState([]);

  const handleUploadClick = async() => {
    try {
        const response = await axios.post("http://localhost:3000/assets", {
            "challanNo": data.challan_id,
            "carNo": vehicleNo,  
            "challanAmount": data.amount,
            "reason": data.reason,
            "owner": "sadhak",
            "proof": data.img,
            "status": "waiting"
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        // Handle response if needed
        console.log(response.data); // Assuming response contains some data you may need
    
      } catch (error) {
        // Handle error
        console.error('Failed to create asset:', error);
      }

      alert("Proof Uploaded Successfully");
        navigate("/view");
  }

  const onDrop = useCallback((acceptedFiles) => {
      setProofFiles([...proofFiles, ...acceptedFiles]);
  }, [proofFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*,video/*' });

  return (
      <div className="challan">
          <div className="challanimg">
              <img src={data.img} alt="car" />
          </div>
          <div className="rightside">
              <div className="rightcontainer">
                  <div className="challan__info">
                      <span className="challan_id">Challan Number: {data.challan_id}</span>
                      <p>Reason: {data.reason}</p>
                      <p>Location: {data.location}</p>
                  </div>

                  <hr className="line" />

                  <div className="amount">
                      <div className="">Amount: Rs. {data.amount}</div>
                  </div>
              </div>

              <div className="proof-section" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                      isDragActive ?
                          <p>Drop the files here...</p> :
                          <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                  {proofFiles.length > 0 && (
                      <div>
                          <p>Proof Files:</p>
                          <ul>
                              {proofFiles.map((file, index) => (
                                  <li key={index}>
                                      {file.name}
                                      <button onClick={() => setProofFiles(proofFiles.filter((_, i) => i !== index))}>Delete</button>
                                  </li>
                              ))}
                          </ul>
                      </div>
                  )}
              </div>

              <hr className="line" />

              <div className="buttons">
              <Button children="Challenge" onClick= {handleUploadClick} color ="#100775"/>
              </div>
          </div>
      </div>
  );
}


export default UploadProofCard;
