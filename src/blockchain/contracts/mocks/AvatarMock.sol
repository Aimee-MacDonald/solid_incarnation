//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract AvatarMock {
  bool public initialised;
  bool public wasTransferred;
  string public imageData;

  function init() external {
    initialised = true;
    imageData = "Image Data";
  }
  
  function transferOwnership(address recipient) external {
    //  Silence test warning
    address temp = recipient;
    temp = address(0);

    wasTransferred = true;
  }
}