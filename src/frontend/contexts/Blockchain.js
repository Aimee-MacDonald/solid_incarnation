import React, { createContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'

import AvatarFactory from '../artifacts/src/blockchain/contracts/AvatarFactory.sol/AvatarFactory.json'
import Avatar from '../artifacts/src/blockchain/contracts/Avatar.sol/Avatar.json'
import AvatarFace from '../artifacts/src/blockchain/contracts/AvatarFace.sol/AvatarFace.json'
import Geometry from '../artifacts/src/blockchain/contracts/Geometry.sol/Geometry.json'
import EyesLayout from '../artifacts/src/blockchain/contracts/EyesLayout.sol/EyesLayout.json'
import FaceLayout from '../artifacts/src/blockchain/contracts/FaceLayout.sol/FaceLayout.json'

export default ({ children }) => {
  const [ wallet, setWallet ] = useState(null)
  const [ avatarFactory, setAvatarFactory ] = useState(null)
  const [ avatar, setAvatar ] = useState(null)
  const [ avatarFace, setAvatarFace ] = useState(null)
  const [ geometry, setGeometry ] = useState(null)
  const [ eyesLayout, setEyesLayout ] = useState(null)
  const [ faceLayout, setFaceLayout ] = useState(null)

  useEffect(() => {loadContracts()}, [ wallet ])

  const loadContracts = async () => {
    //  MUMBAI
    //  const avatarFactoryAddress = '0x31b4F82dc783531c5e9bb45da6C370D9F708BB6f'

    if(wallet === null) {
      await window.ethereum.request({ method: 'eth_requestAccounts' })

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const _signer = provider.getSigner()
      const _address = await _signer.getAddress()
    
      setWallet({ signer: _signer, address: _address })
    } else {
      //  Avatar Factory
      const avatarFactoryAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'
      const _avatarFactory = new ethers.Contract(avatarFactoryAddress, AvatarFactory.abi, wallet.signer)
      
      setAvatarFactory(_avatarFactory)

      //  Avatar
      const avatarCount = (await _avatarFactory.balanceOf(wallet.address)).toNumber()
      if(avatarCount > 0) {
        const avatarId = await _avatarFactory.tokenOfOwnerByIndex(wallet.address, 0)
        const avatarAddress = await _avatarFactory.contractAddressOf(avatarId)
        const _avatar = new ethers.Contract(avatarAddress, Avatar.abi, wallet.signer)

        const _image = await _avatar.imageData()

        setAvatar({ contract: _avatar, imageData: _image })
      } else {
        console.log('Mint an Avatar')
      }

      //  Avatar Face
      const avatarFaceAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'
      const _avatarFace = new ethers.Contract(avatarFaceAddress, AvatarFace.abi, wallet.signer)
      
      setAvatarFace(_avatarFace)

      //  Geometry
      const geometryAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
      const _geometry = new ethers.Contract(geometryAddress, Geometry.abi, wallet.signer)

      setGeometry(_geometry)

      //  Eyes Layout
      const eyesLayoutAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
      const _eyesLayout = new ethers.Contract(eyesLayoutAddress, EyesLayout.abi, wallet.signer)

      setEyesLayout(_eyesLayout)

      // Face Layout
      const faceLayoutAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
      const _faceLayout = new ethers.Contract(faceLayoutAddress, FaceLayout.abi, wallet.signer)

      setFaceLayout(_faceLayout)
    }
  }

  const blockchain = {
    wallet,
    avatarFactory,
    avatar,
    avatarFace,
    geometry,
    eyesLayout,
    faceLayout
  }

  return (
    <BlockchainContext.Provider value={blockchain}>
      { children }
    </BlockchainContext.Provider>
  )
}

const BlockchainContext = createContext(null)
export { BlockchainContext }