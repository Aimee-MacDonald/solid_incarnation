const { expect } = require('chai')

describe('AvatarFactory Unit Test', () => {
  let signers
  let avatarFactory
  let AvatarMock

  beforeEach(async () => {
    signers = await ethers.getSigners()

    AvatarMock = await ethers.getContractFactory('AvatarMock')
    const AvatarFactory = await ethers.getContractFactory('AvatarFactory')
    
    const avatarMock = await AvatarMock.deploy()
    avatarFactory = await AvatarFactory.deploy(avatarMock.address)
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

      const contractAddress_1 = await avatarFactory.contractAddressOf(1)
      const contractAddress_2 = await avatarFactory.contractAddressOf(2)

      expect(contractAddress_1).to.not.equal('0x0000000000000000000000000000000000000000')
      expect(contractAddress_2).to.not.equal('0x0000000000000000000000000000000000000000')
      expect(contractAddress_1).to.not.equal(contractAddress_2)
    })

    it('Should initialise the new Avatar contract', async () => {
      await avatarFactory.mintAvatar(signers[0].address)
      const mockAvatarAddress = await avatarFactory.contractAddressOf(1)
      expect(mockAvatarAddress).to.not.equal('0x0000000000000000000000000000000000000000')
      const mockAvatar = await AvatarMock.attach(mockAvatarAddress)

      const initialised = await mockAvatar.initialised()
      
      expect(initialised).to.equal(true)
    })

    it('Should transfer the contract to the recipients wallet', async () => {
      await avatarFactory.mintAvatar(signers[0].address)
      const mockAvatarAddress = await avatarFactory.contractAddressOf(1)
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
      const contractAddress = await avatarFactory.contractAddressOf(1)

      expect(contractAddress).to.not.equal('0x0000000000000000000000000000000000000000')
    })
    
    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.contractAddressOf(0)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFactory.mintAvatar(signers[0].address)
    })

    it('Should return a token URI', async () => {
      const tokenURI = await avatarFactory.tokenURI(1)
      expect(tokenURI).to.equal('Token URI')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFactory.tokenURI(0)).to.be.revertedWith('AvatarFactory: Token does not exist')
    })
  })
})