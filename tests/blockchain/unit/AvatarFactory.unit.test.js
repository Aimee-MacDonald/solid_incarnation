const { expect } = require('chai')

describe('AvatarFactory Unit Test', () => {
  let signers
  let avatarFactory

  beforeEach(async () => {
    signers = await ethers.getSigners()

    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    avatarFactory = await AvatarFactory.deploy()
  })

  describe('Minting', () => {
    it('Should mint a new Avatar NFT', async () => {
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(0)
      
      await avatarFactory.mintAvatar(signers[0].address)
      
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(1)
    })
  })
})