import React from 'react'

import BlockchainProvider from '../../../contexts/Blockchain'

import WelcomeView from './views/WelcomeView/WelcomeView'
import AvatarView from './views/AvatarView/AvatarView'
import CollectionsView from './views/CollectionsView/CollectionsView'
import GuildsView from './views/GuildsView/GuildsView'
import LayoutView from './views/LayoutView/LayoutView'
import MintView from './views/MintView/MintView'
import GeometryView from './views/GeometryView/GeometryView'

const Testnet = ({ views, activeView }) => (
  <div>
    <BlockchainProvider>
      {activeView === views.indexOf('WELCOME') && <WelcomeView/>}
      {activeView === views.indexOf('MINT') && <MintView/>}
      {activeView === views.indexOf('AVATAR') && <AvatarView/>}
      {activeView === views.indexOf('COLLECTIONS') && <CollectionsView/>}
      {activeView === views.indexOf('GUILDS') && <GuildsView/>}
      {activeView === views.indexOf('LAYOUT') && <LayoutView/>}
      {activeView === views.indexOf('GEOMETRY') && <GeometryView/>}
    </BlockchainProvider>
  </div>
)

export default Testnet