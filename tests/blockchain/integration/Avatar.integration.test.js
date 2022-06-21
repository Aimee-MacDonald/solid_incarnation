const { expect } = require('chai')

describe('Avatar Integration', () => {
  let signers
  let avatar_0

  beforeEach(async () => {
    const Avatar = await ethers.getContractFactory('Avatar')
    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    
    const avatar = await Avatar.deploy()
    const avatarFactory = await AvatarFactory.deploy(avatar.address)

    signers = await ethers.getSigners()
    await avatarFactory.mintAvatar(signers[0].address)
    const avatarAddress_0 = await avatarFactory.contractAddressOf(0)
    avatar_0 = Avatar.attach(avatarAddress_0)
  })

  describe('Minting', () => {
    it('Should be initialised by the AvatarFactory', () => {
      expect(avatar_0.init()).to.be.revertedWith('Initializable: contract is already initialized')
    })

    it('Should be owned by the recipient wallet', async () => {
      expect(await avatar_0.owner()).to.equal(signers[0].address)
    })
  })

  describe('Image Data', () => {
    it('Should return image data for the Avatar', async () => {
      expect(await avatar_0.imageData()).to.equal('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48L3N2Zz4=')
    })
  })
})