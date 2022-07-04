const { expect } = require('chai')

describe('EyesLayout Unit', () => {
  let signers
  let eyesLayout
  let geometryMock

  beforeEach(async () => {
      signers = await ethers.getSigners()
      
      const EyesLayout = await ethers.getContractFactory('EyesLayout')
      eyesLayout = await EyesLayout.deploy()
    })

  describe('Minting', () => {
    it('Should mint a new EyesLayout NFT', async () => {
      expect(await eyesLayout.balanceOf(signers[0].address)).to.equal(0)
  
      await eyesLayout.mint(signers[0].address)
  
      expect(await eyesLayout.balanceOf(signers[0].address)).to.equal(1)
    })
  })

  describe('Token SVG Data', () => {
    beforeEach(async () => {
      const GeometryMock = await ethers.getContractFactory('GeometryMock')
      geometryMock = await GeometryMock.deploy()
    })

    //  Should revert if the token does not exist

    it('Should return SVG data for the entire layout', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
    })

    it('Should set the left eye geometry', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
      expect(await eyesLayout.tokenSVG(2)).to.equal('<g id="eyes"></g>')

      //  Should revert if token is not owned
      await eyesLayout.setLeftEyeGeometry(1, geometryMock.address, 1)
      await eyesLayout.setLeftEyeGeometry(2, geometryMock.address, 2)

      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes">Mock Geometry</g>')
      expect(await eyesLayout.tokenSVG(2)).to.equal('<g id="eyes">Other Mock Geometry</g>')
    })

    it('Should set the right eye geometry', async () => {
      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes"></g>')
      expect(await eyesLayout.tokenSVG(2)).to.equal('<g id="eyes"></g>')

      //  Should revert if token is not owned
      await eyesLayout.setRightEyeGeometry(1, geometryMock.address, 1)
      await eyesLayout.setRightEyeGeometry(2, geometryMock.address, 2)

      expect(await eyesLayout.tokenSVG(1)).to.equal('<g id="eyes">Mock Geometry</g>')
      expect(await eyesLayout.tokenSVG(2)).to.equal('<g id="eyes">Other Mock Geometry</g>')
    })
  })

  describe('Token URI Data', () => {
    beforeEach(async () => {
      await eyesLayout.mint(signers[0].address)
    })

    it('Should return URI data for the layout', async () => {
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrUEM5blBqd3ZjM1puUGc9PSJ9')
    })

    it('Should update the URI data accordingly', async () => {
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrUEM5blBqd3ZjM1puUGc9PSJ9')
      
      await eyesLayout.setLeftEyeGeometry(1, geometryMock.address, 1)
      await eyesLayout.setRightEyeGeometry(1, geometryMock.address, 2)
      
      expect(await eyesLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVpYbGxjeUkrVFc5amF5QkhaVzl0WlhSeWVVOTBhR1Z5SUUxdlkyc2dSMlZ2YldWMGNuazhMMmMrUEM5emRtYysifQ==')
    })
  })
})