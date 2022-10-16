import { ethers } from 'ethers';
import React, { useState } from 'react'
import { ContractABI, ContractAddress } from '../Constants/ContractConstants';
import {NFTStorage} from 'nft.storage'
import '../CSS/CreateCerti.css'


function CreateCerti() {
    // Address from the usere where NFT/Marksheed need to send
  const [toAddress, setToAddress] = useState()
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractInstantce = new ethers.Contract(ContractAddress, ContractABI,signer)

    const [uploadFile ,setUploadFile] = useState()
    const [metaDataURL, setMetaDataURl] = useState()
    const [imageView, setImageView] = useState();

    const [patient, setPatient] = useState();
    const [patientDes, setPatientDes] = useState()

    const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFhNWNiQTlFYkQwRTcxZWE4NTA0Zjk5NGE0MkNBOUE3MWRlQTkwZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MTU3NjQ1MTE4MCwibmFtZSI6Ikluc3RpdHV0ZSBNYW5hZ2VtZW50In0.s4o-sf9pRDr7oZq-zTDiedhNm49JW_AKGibtGOCg9VY'
//   Uploadig NFT data to IPFS


    const getAddress = (e)=>{
    let p =  e.target.value;
    setToAddress(p)
    } 

// Input Section to whome send the NFT

const uploadNFTContent = async(inputFile)  =>{
    const nftStorage = new NFTStorage({token: API_KEY,})

    try {
        const metaData = await nftStorage.store({
            name:inputFile.name,
            description: `${patientDes}`,
            name:`${patient}`,
            image:inputFile,
            attributes: [
              {
                "display_type": "date", 
                "trait_type": "Issued Date", 
                "value": Math.round(Date.now() / 1000)
              }
            ]
        });

        setMetaDataURl(getIPFSGatewayURL(metaData.url));
        // console.log("Metadata:- ", metaData);
        previewNFT(metaData)
        MetaTrx(metaData)
        return metaData
    } catch (error) {
        alert(error)
    }
  }
  const getIPFSGatewayURL = (ipfsURL)=>{
    let urlArray = ipfsURL.split("/");
    let ipfsGateWayURL = `https://${urlArray[2]}.ipfs.dweb.link/${urlArray[3]}`;
    return ipfsGateWayURL;
}
const previewNFT = (metaData) =>{
    let imgViewString = getIPFSGatewayURL(metaData.data.image.pathname);;
    setImageView(imgViewString);
    setMetaDataURl(getIPFSGatewayURL(metaData.url));

 
}
  const handleFileUpload= async(event) =>{
    event.preventDefault()
    setUploadFile(event.target.files[0])
  }

  const MetaTrx = async(metaData) =>{
    // It's working properly.
        const mintProfile = await contractInstantce.createCertificate(toAddress,getIPFSGatewayURL(metaData.url));
        await mintProfile.wait()
        window.alert("Certificate send successfully :)")
  }
  const mintNFTToken = async(event , uploadedFile) =>{
    event.preventDefault()
    const metadata = await uploadNFTContent(uploadFile)
  }


  const patientNamefun = (e) =>{
    setPatient(e.target.value)
  }
  const patientDescfun = (e) =>{
    setPatientDes(e.target.value)
  }

// Button to Send NFT 

// Final popUp for the NFT

    return (
    <div className='SBTBody'>
        <h1 className='send'>Send Certificates as SBT</h1>
        <input type="text" className='getAddressInput' placeholder='Enter Wallet address' onChange={getAddress} />


        <form className='form'>
              <label className='label1' htmlFor="chooseFile">Certificate
              <input className='fileUpload' type="file" id='chooseFile' onChange={handleFileUpload}/>
              </label>
        </form>
<br />
      
        <input type="text" className='getAddressInput' placeholder='Patient Name' onChange={patientNamefun} />
        <input type="text" className='getAddressInput' placeholder='Patient Description' onChange={patientDescfun} />
        <br />

        <button className='SendMarksheet' onClick={mintNFTToken}>Send Certificates</button>
    </div>
  )
}

export default CreateCerti