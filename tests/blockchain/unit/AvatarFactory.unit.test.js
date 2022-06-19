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
    
    it('Should deploy a new Avatar contract', async () => {
      await avatarFactory.mintAvatar(signers[0].address)
      await avatarFactory.mintAvatar(signers[1].address)

      const contractAddress_0 = await avatarFactory.contractAddressOf(0)
      const contractAddress_1 = await avatarFactory.contractAddressOf(1)

      expect(contractAddress_0).to.not.equal('0x0000000000000000000000000000000000000000')
      expect(contractAddress_1).to.not.equal('0x0000000000000000000000000000000000000000')
      expect(contractAddress_0).to.not.equal(contractAddress_1)
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

  describe('Governance', () => {
    describe('Avatar Implementation', () => {
      it('Should set the avatar implementation address', async () => {
        expect(await avatarFactory.avatarImplementationAddress()).to.not.equal('0x1010101010101010101010101010101010101010')
        
        await avatarFactory.setAvatarImplementation('0x1010101010101010101010101010101010101010')
        
        expect(await avatarFactory.avatarImplementationAddress()).to.equal('0x1010101010101010101010101010101010101010')
      })

      it('Should revert if not the contract owner', async () => {
        const avatarAddress_0 = await avatarFactory.avatarImplementationAddress()
        expect(avatarAddress_0).to.not.equal('0x1010101010101010101010101010101010101010')
        
        expect(avatarFactory.connect(signers[1]).setAvatarImplementation('0x1010101010101010101010101010101010101010')).to.be.revertedWith('Ownable: caller is not the owner')
        
        expect(await avatarFactory.avatarImplementationAddress()).to.not.equal('0x1010101010101010101010101010101010101010')
        expect(await avatarFactory.avatarImplementationAddress()).to.equal(avatarAddress_0)
      })
    })
  })
})