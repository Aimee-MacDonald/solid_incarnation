import React, { useState, useContext, useEffect } from 'react'

import { BlockchainContext } from '../../../../../../../contexts/Blockchain'

const FaceEditor = () => {
  const [ faceAddress, setFaceAddress ] = useState(null)
  const [ faceId, setFaceId ] = useState(null)

  const { wallet, avatar, avatarFace } = useContext(BlockchainContext)

  useEffect(() => {
    loadFaceDetails()
    loadFaceTokens()
  }, [])

  const loadFaceDetails = () => {
    avatar.contract.faceAddress()
      .then(result => console.log(result))
      .catch(error => console.log(error))

    avatar.contract.faceId()
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const loadFaceTokens = () => {
    avatarFace.balanceOf(wallet.address)
      .then(result => console.log(result.toNumber()))
      .catch(error => console.log(error))
  }

  const setFace = e => {
    e.preventDefault()

    const faceAddress = e.target.faceAddress.value
    const faceId = e.target.faceId.value
    
    avatar.contract.setFace(faceAddress, faceId)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  const mintFace = e => {
    e.preventDefault()

    const recipient = e.target.recipient.value
    const geometryId = e.target.geometryId.value

    avatarFace.mint(recipient, geometryId)
      .then(transaction => transaction.wait())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  return (
    <div>
      <h1>FaceEditor</h1>

      <form onSubmit={setFace}>
        <input id='faceAddress' placeholder={`Face Address: ${faceAddress}`} />
        <input id='faceId' placeholder={`Face ID: ${faceId}`} />
        <button type='submit'>Set Face</button>
      </form>

      <form onSubmit={mintFace}>
        <input id='recipient' placeholder='Recipient'/>
        <input id='geometryId' placeholder='Geometry ID'/>
        {/* mint(address recipient, uint256 geometryId) */}
        <button type='submit'>Mint Face</button>
      </form>
    </div>
  )
}

export default FaceEditor