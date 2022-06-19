const { expect } = require('chai')

describe('AvatarFactory Unit Test', () => {
  let signers
  let avatarFactory
  let avatarFaceMock

  beforeEach(async () => {
    signers = await ethers.getSigners()

    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    avatarFactory = await AvatarFactory.deploy()

    const AvatarFaceMock = await ethers.getContractFactory('AvatarFaceMock')
    avatarFaceMock = await AvatarFaceMock.deploy()
  })

  describe('Minting', () => {
    it('Should mint a new Avatar NFT', async () => {
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(0)
      
      await avatarFactory.mintAvatar(signers[0].address)
      
      expect(await avatarFactory.balanceOf(signers[0].address)).to.equal(1)
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFactory.setFaceAddress(avatarFaceMock.address)
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFactory.tokenURI(0)
      expect(tokenURI).to.equal('data:application/json;base64,eyJiYWNrZ3JvdW5kX2NvbG9yIjoiMDAwMDAwIiwibmFtZSI6IkF2YXRhciIsImRlc2NyaXB0aW9uIjoiU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNUJkbUYwWVhJZ1JtRmpaU0JUVmtjOEwzTjJaejQ9IiwiYXR0cmlidXRlcyI6IltdIn0=')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.tokenURI(1)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })
})