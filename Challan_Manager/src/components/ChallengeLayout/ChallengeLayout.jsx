import React from 'react'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import UploadProofCard from '../UploadProofCard/UploadProofCard'
import { useLocation } from 'react-router'

const ChallengeLayout = (props) => {
    const location = useLocation();
    const data = location.state;
  return (
    <>
        <Navbar />
        <main>
          <UploadProofCard data = {data}/>
        </main>
        <Footer />
    </>
  )
}

export default ChallengeLayout