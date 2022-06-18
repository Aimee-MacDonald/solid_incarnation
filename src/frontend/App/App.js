import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import AvatarFactory from '../artifacts/src/blockchain/contracts/AvatarFactory.sol/AvatarFactory.json'

const App = () => {
  const [ wallet, setWallet ] = useState(null)
  const [ avatarFactory, setAvatarFactory ] = useState(null)
  const [ avatarCount, setAvatarCount ] = useState(null)
  const [ avatarImage, setAvatarImage ] = useState('#')

  useEffect(() => {loadAvatar()}, [wallet, avatarFactory])

  const connectWallet = async () => {
    await window.ethereum.request({ method: 'eth_requestAccounts' })

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const _signer = provider.getSigner()
    const _address = await _signer.getAddress()
    
    setWallet({ signer: _signer, address: _address })
  }

  const loadAvatarFactory = () => {
    if(wallet === null) {
      connectWallet()
    } else {
      const avatarFactoryAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
      const _avatarFactory = new ethers.Contract(avatarFactoryAddress, AvatarFactory.abi, wallet.signer)

      setAvatarFactory(_avatarFactory)
    }
  }

  const loadAvatar = async () => {
    if(avatarFactory === null) {
      loadAvatarFactory()
    } else {
      const afBalance = await avatarFactory.balanceOf(wallet.address)
      setAvatarCount(afBalance.toNumber())

      if(afBalance > 0) {
        avatarFactory.tokenURI(0)
          .then(result => result.substring(29, result.length))
          .then(result => window.atob(result))
          .then(result => JSON.parse(result))
          .then(result => result.image)
          .then(result => setAvatarImage(result))
          .catch(error => console.log(error))
      }
    }
  }

  const mintAvatar = () => {
    if(avatarFactory === null) {
      loadAvatarFactory()
    } else {
      avatarFactory.mintAvatar(wallet.address)
        .then(transaction => transaction.wait())
        .then(() => loadAvatar())
        .catch(error => console.log(error))
    }
  }

  return (
    <div>
      <h1>Solid Incarnation</h1>
      <p>Avatar Count: {avatarCount}</p>
      {avatarCount !== 1 && <button onClick={mintAvatar}>Mint Avatar</button>}
      {avatarCount > 0 && <img src={avatarImage}/>}
    </div>
  )
}

export default App