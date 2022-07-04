//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import 'base64-sol/base64.sol';

abstract contract Layout is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  constructor() ERC721("Solid Incarnation Layout", "SIL") {
    _tokenIdTracker.increment();
  }

  function mint(address recipient) external {
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "AvatarFace: Token does not exist");
    
    string memory name = "GET LAYOUT NAME";
    string memory description = "GET LAYOUT DESCRIPTION";

    string memory image = Base64.encode(bytes(string(abi.encodePacked(
      '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
        tokenSVG(tokenId),
      '</svg>')
    )));

    return string(
      abi.encodePacked(
        'data:application/json;base64,',
        Base64.encode(
          bytes(
            abi.encodePacked(
              '{"name":"',
              name,
              '","description":"',
              description,
              '","image":"data:image/svg+xml;base64,',
              image,
              '"}'
            )
          )
        )
      )
    );
  }

  function tokenSVG(uint256 tokenId) public virtual view returns (string memory);
}