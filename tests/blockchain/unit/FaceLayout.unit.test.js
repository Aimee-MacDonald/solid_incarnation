const { expect } = require('chai')

describe('FaceLayout Unit', () => {
  describe('Minting', () => {
    let signers
    let faceLayout
    let geometryMock
    let layoutMock

    beforeEach(async () => {
      signers = await ethers.getSigners()
      
      const FaceLayout = await ethers.getContractFactory('FaceLayout')
      const GeometryMock = await ethers.getContractFactory('GeometryMock')
      const LayoutMock = await ethers.getContractFactory('LayoutMock')
      
      faceLayout = await FaceLayout.deploy()
      geometryMock = await GeometryMock.deploy()
      layoutMock = await LayoutMock.deploy()
    })

    describe('Minting', () => {
      it('Should mint a new FaceLayout NFT', async () => {
        expect(await faceLayout.balanceOf(signers[0].address)).to.equal(0)
  
        await faceLayout.mint(signers[0].address)
  
        expect(await faceLayout.balanceOf(signers[0].address)).to.equal(1)
      })
    })

    describe('Token Data', () => {
      beforeEach(async () => {
        await faceLayout.mint(signers[0].address)
        await faceLayout.mint(signers[0].address)
      })

      it('Should return SVG data for the entire layout', async () => {
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
      })

      it('Should set the face geometry', async () => {
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"></g>')

        await faceLayout.setGeometry(1, geometryMock.address, 1)
        await faceLayout.setGeometry(2, geometryMock.address, 2)

        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face">Mock Geometry</g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face">Other Mock Geometry</g>')
      })

      it('Should set Eyes Layout', async () => {
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
        
        await faceLayout.setEyesLayout(1, layoutMock.address, 1)
        
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face">Mock Layout</g>')
      })

      it('Should set Nose Geometry', async () => {
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"></g>')

        await faceLayout.setNoseGeometry(1, geometryMock.address, 1)
        await faceLayout.setNoseGeometry(2, geometryMock.address, 2)

        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face">Mock Geometry</g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face">Other Mock Geometry</g>')
      })

      it('Should set Mouth Geometry', async () => {
        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"></g>')

        await faceLayout.setMouthGeometry(1, geometryMock.address, 1)
        await faceLayout.setMouthGeometry(2, geometryMock.address, 2)

        expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face">Mock Geometry</g>')
        expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face">Other Mock Geometry</g>')
      })
    })
  })
})