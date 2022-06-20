const { expect } = require('chai')

describe('AvatarFactory Unit Test', () => {
  let signers
  let avatarFactory
  let avatarFaceMock, AvatarMock

  beforeEach(async () => {
    signers = await ethers.getSigners()

    AvatarMock = await ethers.getContractFactory('AvatarMock')
    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    const AvatarFaceMock = await ethers.getContractFactory('AvatarFaceMock')
    
    const avatarMock = await AvatarMock.deploy()
    avatarFactory = await AvatarFactory.deploy(avatarMock.address)
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

    it('Should initialise the new Avatar contract', async () => {
      await avatarFactory.mintAvatar(signers[0].address)
      const mockAvatarAddress = await avatarFactory.contractAddressOf(0)
      expect(mockAvatarAddress).to.not.equal('0x0000000000000000000000000000000000000000')
      const mockAvatar = await AvatarMock.attach(mockAvatarAddress)

      const initialised = await mockAvatar.initialised()
      
      expect(initialised).to.equal(true)
    })

    it('Should transfer the contract to the recipients wallet', async () => {
      await avatarFactory.mintAvatar(signers[0].address)
      const mockAvatarAddress = await avatarFactory.contractAddressOf(0)
      expect(mockAvatarAddress).to.not.equal('0x0000000000000000000000000000000000000000')
      const mockAvatar = await AvatarMock.attach(mockAvatarAddress)
      
      const wasTransferred = await mockAvatar.wasTransferred()
      
      expect(wasTransferred).to.equal(true)
    })
  })

  describe('Avatar contract address', () => {
    beforeEach(async () => {
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return the avatar contract address', async () => {
      const contractAddress = await avatarFactory.contractAddressOf(0)

      expect(contractAddress).to.not.equal('0x0000000000000000000000000000000000000000')
    })
    
    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.contractAddressOf(1)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFactory.setFaceAddress(avatarFaceMock.address)
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFactory.tokenURI(0)
      expect(tokenURI).to.equal('data:application/json;base64,eyJiYWNrZ3JvdW5kX2NvbG9yIjoiMDAwMDAwIiwibmFtZSI6IkF2YXRhciIsImRlc2NyaXB0aW9uIjoiU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJJbWFnZSBEYXRhIiwiYXR0cmlidXRlcyI6IltdIn0=')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.tokenURI(1)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })
})