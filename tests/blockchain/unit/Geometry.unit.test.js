const { expect } = require('chai')

describe('Geometry Unit', () => {
  let geometry

  beforeEach(async () => {
    const Geometry = await ethers.getContractFactory('Geometry')
    geometry = await Geometry.deploy()
  })

  it('Should add and return geometry', async () => {
    expect(await geometry.getGeometry(1)).to.equal('')
    
    await geometry.addGeometry('Geometry')
    
    expect(await geometry.getGeometry(1)).to.equal('Geometry')
  })

  it('Should return the total number of geometries in the contract', async () => {
    expect(await geometry.geometryCount()).to.equal(0)
    
    await geometry.addGeometry('Geometry')
    
    expect(await geometry.geometryCount()).to.equal(1)
  })
})