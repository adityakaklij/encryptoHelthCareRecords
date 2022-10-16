import React, { useState } from 'react'
import { ContractABI, ContractAddress } from '../Constants/ContractConstants';
import {ethers} from 'ethers'
import '../CSS/VerifyDetails.css'

function VerifyCerti() {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(ContractAddress, ContractABI,signer)

    const [data, setData]= useState()

    const getDetails = async()=>{
      
      const getData = await contractInstantce.balanceOf(data)
      console.log("get data - ",getData.toString())
      if (getData.toString() === "0"){
        console.log("No data found")
      }
      else{

        // const tokenMetada = await fetch(getData)
        // const jsonData = await tokenMetada.json()
        // let fetchedStudentId = await jsonData.StudentId ;
        alert("Patient is Verified")
      }
    }

    const details = (e) =>{
      setData(e.target.value)
    }

  return (
    <>

        <h1 className='stud'>Enter Patient's Verification</h1>
        
        <div className="verifyDiv">
            <input type="text" className='verifyStdInput' onChange={details} placeholder="Enter Patient's ID" />
            <br />
            <button className='veryFyDetailBtn' onClick={getDetails}>Get Details</button>
        </div>
    </>
  )
}

export default VerifyCerti