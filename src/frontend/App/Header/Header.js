import React from 'react'

import './Header.sass'

const Header = ({ mainnet, toggleMainnet, views, setActiveView }) => (
  <div id='Header'>
    {!mainnet && (
      <nav>
        <button onClick={() => setActiveView(views.indexOf('WELCOME'))}>SI</button>
        <button onClick={() => setActiveView(views.indexOf('MINT'))}>Mint</button>
        <button onClick={() => setActiveView(views.indexOf('AVATAR'))}>Avatar</button>
        <button onClick={() => setActiveView(views.indexOf('COLLECTIONS'))}>Collections</button>
        <button onClick={() => setActiveView(views.indexOf('GUILDS'))}>Guilds</button>
        <button onClick={() => setActiveView(views.indexOf('LAYOUT'))}>Layout</button>
        <button onClick={() => setActiveView(views.indexOf('GEOMETRY'))}>Geometry</button>
      </nav>
    )}

    <div id='chainSwitch'>
      <p>Polygon Mainnet</p>
      <button id='toggle' className={mainnet ? 'left' : 'right'} onClick={toggleMainnet}>
        <div></div>
      </button>
      <p>Mumbai Testnet</p>
    </div>
  </div>
)

export default Header