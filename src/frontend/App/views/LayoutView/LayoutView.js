import React, { useContext, useEffect, useState } from 'react'

import { BlockchainContext } from '../../../contexts/Blockchain'

import EyesLayoutToken from './EyesLayoutToken/EyesLayoutToken'
import FaceLayoutToken from './FaceLayoutToken/FaceLayoutToken'

const LayoutView = () => {
  const { wallet, eyesLayout, faceLayout } = useContext(BlockchainContext)
  const [ eyesLayoutTokens, setEyesLayoutTokens ] = useState([])
  const [ faceLayoutTokens, setFaceLayoutTokens ] = useState([])


  useEffect(() => { loadEyesLayoutTokens() }, [])
  useEffect(() => { loadFaceLayoutTokens() }, [])

  const mintEyes = e => {
    e.preventDefault()

    const recipient = e.target.recipient.value

    if(eyesLayout === null) {
      console.log('EyesLayout not loaded')
    } else {
      eyesLayout.mint(recipient)
        .then(transaction => transaction.wait())
        .then(result => console.log(result))
        .then(() => loadEyesLayoutTokens())
        .catch(error => console.log(error))
    }
  }

  const loadEyesLayoutTokens = async () => {
    if(eyesLayout === null) {
      console.log('EyesLayout not loaded')
    } else {
      const eyesLayoutBalance = (await eyesLayout.balanceOf(wallet.address)).toNumber()

      for(let i = 0; i < eyesLayoutBalance; i++){
        let tokenId

        eyesLayout.tokenOfOwnerByIndex(wallet.address, i)
          .then(_tokenId => tokenId = _tokenId)
          .then(() => eyesLayout.tokenURI(tokenId))
          .then(tokenURI => tokenURI.substring(29, tokenURI.length))
          .then(dataString => window.atob(dataString))
          .then(jsonString => JSON.parse(jsonString))
          .then(tokenJSON => setEyesLayoutTokens(eyesLayoutTokens => ([
            ...eyesLayoutTokens,
            {
              ...tokenJSON,
              tokenId: tokenId.toNumber()
            }
          ])))
          .catch(error => console.log(error))
      }
    }
  }

  const mintFace = e => {
    e.preventDefault()

    const recipient = e.target.recipient.value

    if(faceLayout === null) {
      console.log('FaceLayout not loaded')
    } else {
      faceLayout.mint(recipient)
          .then(transaction => transaction.wait())
          .then(result => console.log(result))
          .then(() => loadFaceLayoutTokens())
          .catch(error => console.log(error))  
    }
  }

  const loadFaceLayoutTokens = async () => {
    if(faceLayout === null) {
      console.log('FaceLayout not loaded')
    } else {
      const faceLayoutBalance = (await faceLayout.balanceOf(wallet.address)).toNumber()

      for(let i = 0; i < faceLayoutBalance; i++){
        let tokenId
        
        faceLayout.tokenOfOwnerByIndex(wallet.address, i)
          .then(_tokenId => tokenId = _tokenId)
          .then(() => faceLayout.tokenURI(tokenId))
          .then(tokenURI => tokenURI.substring(29, tokenURI.length))
          .then(dataString => window.atob(dataString))
          .then(jsonString => JSON.parse(jsonString))
          .then(tokenJSON => setFaceLayoutTokens(faceLayoutTokens => ([
            ...faceLayoutTokens,
            {
              ...tokenJSON,
              tokenId: tokenId.toNumber()
            }
          ])))
          .catch(error => console.log(error))
      }
    }
  }

  return (
    <div>
      <h1>Layout View</h1>

      <div>
        <p>Here is where layout creators mint new layouts</p>
        <p>Layouts, together with child layouts and geometries define the SVG of an avatar image</p>
        <p>Layout creators can add new layout contracts</p>
        <p>So far two layout options exist:</p>
        <ul>
          <li>EyesLayout</li>
          <li>FaceLayout</li>
        </ul>
      </div>

      <div>
        <h2>Eyes Layouts:</h2>

        <form onSubmit={mintEyes}>
          <input id='recipient' placeholder='recipient' required/>
          <button type='submit'>Mint Eyes</button>
        </form>

        <div>
          {eyesLayoutTokens.map(eyesLayoutToken => <EyesLayoutToken eyesLayoutToken={eyesLayoutToken} key={eyesLayoutToken.tokenId}/>)}
        </div>
      </div>

      <div>
        <h2>Face Layouts:</h2>

        <form onSubmit={mintFace}>
          <input id='recipient' placeholder='recipient' required/>
          <button type='submit'>Mint Face</button>
        </form>

        <div>
          {faceLayoutTokens.map(faceLayoutToken => <FaceLayoutToken faceLayoutToken={faceLayoutToken} key={faceLayoutToken.tokenId}/>)}
        </div>
      </div>
    </div>
  )
}

export default LayoutView