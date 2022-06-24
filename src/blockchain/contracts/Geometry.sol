//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Geometry {
  using Counters for Counters.Counter;
  Counters.Counter private _geometryIndexTracker;

  mapping(uint256 => string) geometries;

  constructor() {
    _geometryIndexTracker.increment();
  }

  function getGeometry(uint256 geometryIndex) external view returns (string memory) {
    return geometries[geometryIndex];
  }

  function addGeometry(string memory newGeometry) external returns (uint256) {
    geometries[_geometryIndexTracker.current()] = newGeometry;
    _geometryIndexTracker.increment();
    
    //  Emit Event
  }
}