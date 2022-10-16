import React from 'react'
import { ERC721ABI, ERC721Bytecode } from '../Constants/DeployConstants'
import { useState } from 'react'
import { ethers } from 'ethers'
import '../CSS/DeployContract.css'


function Deploy () {

    const [name, setName]= useState()
    const [symbol, setSymbol]= useState()

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

  const deployContract = async () => {
        const factory = new ethers.ContractFactory(ERC721ABI, ERC721Bytecode, signer)
        // const contract = await factory.deploy(baseURI, name, symbol, NFTSupply);
        const contract = await factory.deploy(name, symbol );
        console.log("address- ", contract.address)
        window.alert(`contract depolyed at ${contract.address}`)
  }

  // Taking the contract information from the user
    function Getname(e){
        setName(e.target.value)
    }
    function Getsymbol(e){
        setSymbol(e.target.value)
    }

    return (
    <div className='deploy1155'>
        <h1 className='deploy1155Heading'>ERC721 contract deployment</h1>

        <br />
        <h3>Enter Details</h3>
        <input type="text" placeholder='Enter Collection Name' onChange={Getname}/>
        <input type="text" placeholder='Symbol' onChange={Getsymbol}/>
        <br />
        <br />
        <button onClick={deployContract}>Deploy Contract</button>
        <br /><br />
    </div>
  )

    }

export default Deploy