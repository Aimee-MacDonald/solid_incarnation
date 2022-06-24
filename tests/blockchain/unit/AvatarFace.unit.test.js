const { expect } = require("chai")

describe('AvatarFace Unit Test', () => {
  let signers
  let avatarFace

  beforeEach(async () => {
    signers = await ethers.getSigners()
    const AvatarFace = await ethers.getContractFactory('AvatarFace')
    const GeometryMock = await ethers.getContractFactory('GeometryMock')

    const geometryMock = await GeometryMock.deploy()
    avatarFace = await AvatarFace.deploy(geometryMock.address)
  })

  describe('Minting', () => {
    it('Should mint a new AvatarFace NFT', async () => {
      expect(await avatarFace.balanceOf(signers[0].address)).to.equal(0)
      
      await avatarFace.mint(signers[0].address, 1)
      
      expect(await avatarFace.balanceOf(signers[0].address)).to.equal(1)
    })
  })

  describe('Token URI', () => {
    beforeEach(async () => {
      await avatarFace.mint(signers[0].address, 1)
      await avatarFace.mint(signers[0].address, 2)
    })

    it('Should return a token URI', async () => {
      const tokenURI_1 = await avatarFace.tokenURI(1)
      const tokenURI_2 = await avatarFace.tokenURI(2)
      
      expect(tokenURI_1).to.equal('data:application/json;base64,eyJuYW1lIjoiQXZhdGFyIEZhY2UiLCJkZXNjcmlwdGlvbiI6IkRlZmF1bHQgRmFjZSBmb3IgU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krVFc5amF5QkhaVzl0WlhSeWVUeG5JR2xrUFNKbGVXVnpJajQ4WnlCcFpEMGliR1ZtZEY5bGVXVWlQanhsYkd4cGNITmxJR040UFNJeE5EVWlJR041UFNJeE56QWlJSEo0UFNJek1DSWdjbms5SWpNMUlpQnpkSGxzWlQwaVptbHNiRG9qWm1abVptWm1PMlpwYkd3dGIzQmhZMmwwZVRveE8yWnBiR3d0Y25Wc1pUcGxkbVZ1YjJSa08zTjBjbTlyWlMxM2FXUjBhRG81T0M0eU5qWXpPM0JoYVc1MExXOXlaR1Z5T20xaGNtdGxjbk1nWm1sc2JDQnpkSEp2YTJVaUx6NDhZMmx5WTJ4bElHTjRQU0l4TlRBaUlHTjVQU0l4TnpBaUlISTlJakUxSWlCemRIbHNaVDBpWm1sc2JEb2pNREF3TURBd08yWnBiR3d0YjNCaFkybDBlVG94TzJacGJHd3RjblZzWlRwbGRtVnViMlJrTzNOMGNtOXJaUzEzYVdSMGFEbzVPQzR5TmpZek8zQmhhVzUwTFc5eVpHVnlPbTFoY210bGNuTWdabWxzYkNCemRISnZhMlVpTHo0OEwyYytQR2NnYVdROUluSnBaMmgwWDJWNVpTSStQR1ZzYkdsd2MyVWdZM2c5SWpJek5TSWdZM2s5SWpFM01DSWdjbmc5SWpNd0lpQnllVDBpTXpVaUlITjBlV3hsUFNKbWFXeHNPaU5tWm1abVptWTdabWxzYkMxdmNHRmphWFI1T2pFN1ptbHNiQzF5ZFd4bE9tVjJaVzV2WkdRN2MzUnliMnRsTFhkcFpIUm9Pams0TGpJMk5qTTdjR0ZwYm5RdGIzSmtaWEk2YldGeWEyVnljeUJtYVd4c0lITjBjbTlyWlNJdlBqeGphWEpqYkdVZ1kzZzlJakl6TUNJZ1kzazlJakUzTUNJZ2NqMGlNVFVpSUhOMGVXeGxQU0ptYVd4c09pTXdNREF3TURBN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp3dlp6NDhMMmMrUEM5blBqd3ZjM1puUGc9PSJ9')
      expect(tokenURI_2).to.equal('data:application/json;base64,eyJuYW1lIjoiQXZhdGFyIEZhY2UiLCJkZXNjcmlwdGlvbiI6IkRlZmF1bHQgRmFjZSBmb3IgU29saWQgSW5jYXJuYXRpb24gQXZhdGFyIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krVDNSb1pYSWdUVzlqYXlCSFpXOXRaWFJ5ZVR4bklHbGtQU0psZVdWeklqNDhaeUJwWkQwaWJHVm1kRjlsZVdVaVBqeGxiR3hwY0hObElHTjRQU0l4TkRVaUlHTjVQU0l4TnpBaUlISjRQU0l6TUNJZ2NuazlJak0xSWlCemRIbHNaVDBpWm1sc2JEb2pabVptWm1abU8yWnBiR3d0YjNCaFkybDBlVG94TzJacGJHd3RjblZzWlRwbGRtVnViMlJrTzNOMGNtOXJaUzEzYVdSMGFEbzVPQzR5TmpZek8zQmhhVzUwTFc5eVpHVnlPbTFoY210bGNuTWdabWxzYkNCemRISnZhMlVpTHo0OFkybHlZMnhsSUdONFBTSXhOVEFpSUdONVBTSXhOekFpSUhJOUlqRTFJaUJ6ZEhsc1pUMGlabWxzYkRvak1EQXdNREF3TzJacGJHd3RiM0JoWTJsMGVUb3hPMlpwYkd3dGNuVnNaVHBsZG1WdWIyUmtPM04wY205clpTMTNhV1IwYURvNU9DNHlOall6TzNCaGFXNTBMVzl5WkdWeU9tMWhjbXRsY25NZ1ptbHNiQ0J6ZEhKdmEyVWlMejQ4TDJjK1BHY2dhV1E5SW5KcFoyaDBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakl6TlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqSXpNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OEwyYytQQzluUGp3dmMzWm5QZz09In0=')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFace.tokenURI(0)).to.be.revertedWith('AvatarFace: Token does not exist')
    })
  })

  describe('Token SVG', () => {
    beforeEach(async () => {
      await avatarFace.mint(signers[0].address, 1)
      await avatarFace.mint(signers[0].address, 2)
    })

    it('Should return SVG data for the token', async () => {
      const tokenSVG_1 = await avatarFace.tokenSVG(1)
      const tokenSVG_2 = await avatarFace.tokenSVG(2)

      expect(tokenSVG_1).to.equal('<g id="face">Mock Geometry<g id="eyes"><g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g><g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g></g>')
      expect(tokenSVG_2).to.equal('<g id="face">Other Mock Geometry<g id="eyes"><g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g><g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g></g>')
    })

    it('Should revert if the token does not exist', () => {
      expect(avatarFace.tokenSVG(0)).to.be.revertedWith('AvatarFace: Token does not exist')
    })
  })
})