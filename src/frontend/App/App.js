import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'

import AvatarFactory from '../artifacts/src/blockchain/contracts/AvatarFactory.sol/AvatarFactory.json'
import Avatar from '../artifacts/src/blockchain/contracts/Avatar.sol/Avatar.json'
import AvatarFace from '../artifacts/src/blockchain/contracts/AvatarFace.sol/AvatarFace.json'

const App = () => {
  const [ wallet, setWallet ] = useState(null)
  const [ avatarFactory, setAvatarFactory ] = useState(null)
  const [ avatarCount, setAvatarCount ] = useState(null)
  const [ avatarImage, setAvatarImage ] = useState('#')

  const [ avatarFace, setAvatarFace ] = useState(null)
  const [ avatarFaceCount, setAvatarFaceCount ] = useState(null)
  const [ avatarFaces, setAvatarFaces ] = useState([])

  useEffect(() => {loadAvatar()}, [wallet, avatarFactory])
  useEffect(() => {loadFaces()}, [wallet, avatarFactory])
  
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
      //  MUMBAI
      //  const avatarFactoryAddress = '0x31b4F82dc783531c5e9bb45da6C370D9F708BB6f'
      const avatarFactoryAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
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

  const loadAvatarFace = () => {
    if(wallet === null) {
      connectWallet()
    } else {
      const avatarFaceAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
      const _avatarFace = new ethers.Contract(avatarFaceAddress, AvatarFace.abi, wallet.signer)

      setAvatarFace(_avatarFace)
    }
  }

  const loadFaces = async () => {
    if(avatarFace === null) {
      loadAvatarFace()
    } else {
      const afBalance = await avatarFace.balanceOf(wallet.address)
      setAvatarFaceCount(afBalance.toNumber())

      if(afBalance > 0) {
        for(let i = 0; i < afBalance; i++) {
          avatarFace.tokenOfOwnerByIndex(wallet.address, i)
            .then(result => result.toNumber())
            .then(tokenId => avatarFace.tokenURI(tokenId))
            .then(result => result.substring(29, result.length))
            .then(result => window.atob(result))
            .then(result => JSON.parse(result))
            .then(result => setAvatarFaces(avatarFaces => [...avatarFaces, result]))
            .catch(error => console.log(error))
        }
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

  const mintFace = () => {
    if(avatarFace === null) {
      loadAvatarFace()
    } else {
      avatarFace.mint(wallet.address)
        .then(transaction => transaction.wait())
        .then(() => loadFaces())
        .catch(error => console.log(error))
    }
  }

  const applyFace = () => {
    if(avatarFactory === null) {
      loadAvatarFactory()
    } else {
      let avatar
      
      avatarFactory.contractAddressOf(0)
        .then(avatarAddress => new ethers.Contract(avatarAddress, Avatar.abi, wallet.signer))
        .then(_avatar => avatar = _avatar)
        .then(() => avatar.setFace(avatarFace.address, 0))
        .then(transaction => transaction.wait())
        .then(() => avatar.reconstructImageData())
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
      <h2>Faces</h2>
      <p>AvatarFace Count: {avatarFaceCount}</p>
      <button onClick={mintFace}>Mint Face</button>
      {avatarFaces.map((face, i) => (
        <div key={i}>
          <img src={face.image}/>
          <button onClick={applyFace}>Apply to Avatar</button>
        </div>
      ))}
    </div>
  )
}

export default App