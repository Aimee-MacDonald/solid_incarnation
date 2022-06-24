//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract GeometryMock {
  function getGeometry(uint256 geometryIndex) external view returns (string memory) {
    if(geometryIndex == 1) {
      return "Mock Geometry";
    } else {
      return "Other Mock Geometry";
    }
  }
}