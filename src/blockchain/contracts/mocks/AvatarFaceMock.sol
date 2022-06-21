//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract AvatarFaceMock {
  function tokenSVG(uint256 tokenId) public pure returns (string memory) {
    return "Avatar Face SVG";
  }
}