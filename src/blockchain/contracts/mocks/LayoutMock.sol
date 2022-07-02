//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract LayoutMock {
  function tokenSVG(uint256 tokenId) external view returns (string memory) {
    return "Mock Layout";
  }
}