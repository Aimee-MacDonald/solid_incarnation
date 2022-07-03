import React, { useContext, useState } from 'react'

import './App.sass'
import { BlockchainContext } from '../contexts/Blockchain'

import MainnetView from './views/MainnetView/MainnetView'
import WelcomeView from './views/WelcomeView/WelcomeView'
import AvatarView from './views/AvatarView/AvatarView'
import MintView from './views/MintView/MintView'
import GeometryView from './views/GeometryView/GeometryView'

const App = () => {
  const { avatar } = useContext(BlockchainContext)
  
  const [ mainnet, setMainnet ] = useState(true)
  const [ activeView, setActiveView ] = useState(0)

  const views = [
    'WELCOME',
    'MINT',
    'AVATAR',
    'COLLECTIONS',
    'LAYOUT',
    'GEOMETRY',
  ]

  return (
    <div id='App'>
      <div id='header'>
        {!mainnet && (
          <nav>
            <button onClick={() => setActiveView(views.indexOf('WELCOME'))}>SI</button>
            <button onClick={() => setActiveView(views.indexOf('MINT'))}>Mint</button>
            <button onClick={() => setActiveView(views.indexOf('AVATAR'))}>Avatar</button>
            <button onClick={() => setActiveView(views.indexOf('COLLECTIONS'))}>Collections</button>
            <button onClick={() => setActiveView(views.indexOf('LAYOUT'))}>Layout</button>
            <button onClick={() => setActiveView(views.indexOf('GEOMETRY'))}>Geometry</button>
          </nav>
        )}

        <div>
          {!mainnet && <button onClick={() => setMainnet(true)}>Polygon Mainnet</button>}
          {mainnet && <button onClick={() => setMainnet(false)}>Mumbai Testnet</button>}
        </div>
      </div>

      {mainnet && <MainnetView/>}
      {!mainnet && (
        <div>
          {activeView === views.indexOf('WELCOME') && <WelcomeView/>}
          {activeView === views.indexOf('MINT') && <MintView />}
          {activeView === views.indexOf('AVATAR') && <AvatarView />}
          
          {activeView === views.indexOf('GEOMETRY') && <GeometryView/>}
        </div>
      )}
    </div>
  )
}

export default App