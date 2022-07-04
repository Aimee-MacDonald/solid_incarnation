const { expect } = require('chai')

describe('FaceLayout integration', () => {
  let signers
  let faceLayout, eyesLayout
  let geometry
  
  beforeEach(async () => {
    signers = await ethers.getSigners()
    
    const FaceLayout = await ethers.getContractFactory('FaceLayout')
    const Geometry = await ethers.getContractFactory('Geometry')
    const EyesLayout = await ethers.getContractFactory('EyesLayout')
    
    faceLayout = await FaceLayout.deploy()
    geometry = await Geometry.deploy()
    eyesLayout = await EyesLayout.deploy()

    await geometry.addGeometry('<ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>')
    await geometry.addGeometry('<ellipse cx="200" cy="180" rx="110" ry="150" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>')
    await geometry.addGeometry('<g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g>')
    await geometry.addGeometry('<g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g>')
    await geometry.addGeometry('<ellipse cx="190" cy="210" rx="10" ry="4" style="fill:#c7b1b7;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>')
    await geometry.addGeometry('<ellipse cx="195" cy="240" rx="20" ry="10" style="fill:#b03a3a;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/>')

    await eyesLayout.setLeftEyeGeometry(1, geometry.address, 3)
    await eyesLayout.setRightEyeGeometry(1, geometry.address, 4)
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

      //  Should revert if data at geometry index is empty
      await faceLayout.setGeometry(1, geometry.address, 1)
      await faceLayout.setGeometry(2, geometry.address, 2)

      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
      expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="110" ry="150" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
    })

    it('Should set Eyes Layout', async () => {
      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')

      //  Should revert if Eyes Layout does not exist
      await faceLayout.setEyesLayout(1, eyesLayout.address, 1)
      
      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"><g id="eyes"><g id="left_eye"><ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g><g id="right_eye"><ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/><circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/></g></g></g>')
    })

    it('Should set Nose Geometry', async () => {
      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
      expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"></g>')
      
      await faceLayout.setNoseGeometry(1, geometry.address, 1)
      await faceLayout.setNoseGeometry(2, geometry.address, 2)
      
      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
      expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="110" ry="150" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
    })

    it('Should set Mouth Geometry', async () => {
      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"></g>')
      expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"></g>')
      
      await faceLayout.setMouthGeometry(1, geometry.address, 1)
      await faceLayout.setMouthGeometry(2, geometry.address, 2)

      expect(await faceLayout.tokenSVG(1)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="150" ry="110" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
      expect(await faceLayout.tokenSVG(2)).to.equal('<g id="face"><ellipse cx="200" cy="180" rx="110" ry="150" style="fill:#9c888e;fill-opacity:1;fill-rule:evenodd;stroke-width:101.109;paint-order:markers fill stroke"/></g>')
    })
  })

  describe('Token URI Data', () => {
    beforeEach(async () => {
      await faceLayout.mint(signers[0].address)
      //  await eyesLayout.mint(signers[0].address)
    })

    it('Should return URI data for the layout', async () => {
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEM5blBqd3ZjM1puUGc9PSJ9')
    })
    
    it('Should update the URI data accordingly', async () => {
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEM5blBqd3ZjM1puUGc9PSJ9')
      
      await faceLayout.setGeometry(1, geometry.address, 1)
      
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEM5blBqd3ZjM1puUGc9PSJ9')
      
      await eyesLayout.setLeftEyeGeometry(1, geometry.address, 3)
      await eyesLayout.setRightEyeGeometry(1, geometry.address, 4)
      await faceLayout.setEyesLayout(1, eyesLayout.address, 1)
      
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdjZ2FXUTlJbVY1WlhNaVBqeG5JR2xrUFNKc1pXWjBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakUwTlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqRTFNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OFp5QnBaRDBpY21sbmFIUmZaWGxsSWo0OFpXeHNhWEJ6WlNCamVEMGlNak0xSWlCamVUMGlNVGN3SWlCeWVEMGlNekFpSUhKNVBTSXpOU0lnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmp0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk9UZ3VNalkyTXp0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdOcGNtTnNaU0JqZUQwaU1qTXdJaUJqZVQwaU1UY3dJaUJ5UFNJeE5TSWdjM1I1YkdVOUltWnBiR3c2SXpBd01EQXdNRHRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQQzluUGp3dlp6NDhMMmMrUEM5emRtYysifQ==')
      
      await faceLayout.setNoseGeometry(1, geometry.address, 5)
      
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdjZ2FXUTlJbVY1WlhNaVBqeG5JR2xrUFNKc1pXWjBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakUwTlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqRTFNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OFp5QnBaRDBpY21sbmFIUmZaWGxsSWo0OFpXeHNhWEJ6WlNCamVEMGlNak0xSWlCamVUMGlNVGN3SWlCeWVEMGlNekFpSUhKNVBTSXpOU0lnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmp0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk9UZ3VNalkyTXp0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdOcGNtTnNaU0JqZUQwaU1qTXdJaUJqZVQwaU1UY3dJaUJ5UFNJeE5TSWdjM1I1YkdVOUltWnBiR3c2SXpBd01EQXdNRHRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQQzluUGp3dlp6NDhaV3hzYVhCelpTQmplRDBpTVRrd0lpQmplVDBpTWpFd0lpQnllRDBpTVRBaUlISjVQU0kwSWlCemRIbHNaVDBpWm1sc2JEb2pZemRpTVdJM08yWnBiR3d0YjNCaFkybDBlVG94TzJacGJHd3RjblZzWlRwbGRtVnViMlJrTzNOMGNtOXJaUzEzYVdSMGFEb3hNREV1TVRBNU8zQmhhVzUwTFc5eVpHVnlPbTFoY210bGNuTWdabWxzYkNCemRISnZhMlVpTHo0OEwyYytQQzl6ZG1jKyJ9')
      
      await faceLayout.setMouthGeometry(1, geometry.address, 6)
      
      expect(await faceLayout.tokenURI(1)).to.equal('data:application/json;base64,eyJuYW1lIjoiR0VUIExBWU9VVCBOQU1FIiwiZGVzY3JpcHRpb24iOiJHRVQgTEFZT1VUIERFU0NSSVBUSU9OIiwiaW1hZ2UiOiJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlOREF3SWlCb1pXbG5hSFE5SWpRd01DSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhaeUJwWkQwaVptRmpaU0krUEdWc2JHbHdjMlVnWTNnOUlqSXdNQ0lnWTNrOUlqRTRNQ0lnY25nOUlqRTFNQ0lnY25rOUlqRXhNQ0lnYzNSNWJHVTlJbVpwYkd3Nkl6bGpPRGc0WlR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdjZ2FXUTlJbVY1WlhNaVBqeG5JR2xrUFNKc1pXWjBYMlY1WlNJK1BHVnNiR2x3YzJVZ1kzZzlJakUwTlNJZ1kzazlJakUzTUNJZ2NuZzlJak13SWlCeWVUMGlNelVpSUhOMGVXeGxQU0ptYVd4c09pTm1abVptWm1ZN1ptbHNiQzF2Y0dGamFYUjVPakU3Wm1sc2JDMXlkV3hsT21WMlpXNXZaR1E3YzNSeWIydGxMWGRwWkhSb09qazRMakkyTmpNN2NHRnBiblF0YjNKa1pYSTZiV0Z5YTJWeWN5Qm1hV3hzSUhOMGNtOXJaU0l2UGp4amFYSmpiR1VnWTNnOUlqRTFNQ0lnWTNrOUlqRTNNQ0lnY2owaU1UVWlJSE4wZVd4bFBTSm1hV3hzT2lNd01EQXdNREE3Wm1sc2JDMXZjR0ZqYVhSNU9qRTdabWxzYkMxeWRXeGxPbVYyWlc1dlpHUTdjM1J5YjJ0bExYZHBaSFJvT2prNExqSTJOak03Y0dGcGJuUXRiM0prWlhJNmJXRnlhMlZ5Y3lCbWFXeHNJSE4wY205clpTSXZQand2Wno0OFp5QnBaRDBpY21sbmFIUmZaWGxsSWo0OFpXeHNhWEJ6WlNCamVEMGlNak0xSWlCamVUMGlNVGN3SWlCeWVEMGlNekFpSUhKNVBTSXpOU0lnYzNSNWJHVTlJbVpwYkd3NkkyWm1abVptWmp0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk9UZ3VNalkyTXp0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEdOcGNtTnNaU0JqZUQwaU1qTXdJaUJqZVQwaU1UY3dJaUJ5UFNJeE5TSWdjM1I1YkdVOUltWnBiR3c2SXpBd01EQXdNRHRtYVd4c0xXOXdZV05wZEhrNk1UdG1hV3hzTFhKMWJHVTZaWFpsYm05a1pEdHpkSEp2YTJVdGQybGtkR2c2T1RndU1qWTJNenR3WVdsdWRDMXZjbVJsY2pwdFlYSnJaWEp6SUdacGJHd2djM1J5YjJ0bElpOCtQQzluUGp3dlp6NDhaV3hzYVhCelpTQmplRDBpTVRrd0lpQmplVDBpTWpFd0lpQnllRDBpTVRBaUlISjVQU0kwSWlCemRIbHNaVDBpWm1sc2JEb2pZemRpTVdJM08yWnBiR3d0YjNCaFkybDBlVG94TzJacGJHd3RjblZzWlRwbGRtVnViMlJrTzNOMGNtOXJaUzEzYVdSMGFEb3hNREV1TVRBNU8zQmhhVzUwTFc5eVpHVnlPbTFoY210bGNuTWdabWxzYkNCemRISnZhMlVpTHo0OFpXeHNhWEJ6WlNCamVEMGlNVGsxSWlCamVUMGlNalF3SWlCeWVEMGlNakFpSUhKNVBTSXhNQ0lnYzNSNWJHVTlJbVpwYkd3NkkySXdNMkV6WVR0bWFXeHNMVzl3WVdOcGRIazZNVHRtYVd4c0xYSjFiR1U2WlhabGJtOWtaRHR6ZEhKdmEyVXRkMmxrZEdnNk1UQXhMakV3T1R0d1lXbHVkQzF2Y21SbGNqcHRZWEpyWlhKeklHWnBiR3dnYzNSeWIydGxJaTgrUEM5blBqd3ZjM1puUGc9PSJ9')
    })
  })
})