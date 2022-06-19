//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import 'base64-sol/base64.sol';

contract AvatarFactory is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  address private avatarFaceAddress;

  constructor() ERC721("Solid Incarnation Avatar", "SIA") {}

  function mintAvatar(address recipient) external {
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();

    //  Check Event Emition
  }

  function tokenURI(uint256 id) public view override returns (string memory) {
    require(_exists(id), "AvatarFactory: Token does not exist");

    string memory color = "000000";
    string memory name = "Avatar";
    string memory description = "Solid Incarnation Avatar";

    string memory faceSVG = IAvatarFace(avatarFaceAddress).tokenSVG(0);

    string memory image = Base64.encode(bytes(string(abi.encodePacked(
      '<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">',
        faceSVG,
      '</svg>'
    ))));
    
    return
      string(
        abi.encodePacked(
          'data:application/json;base64,',
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"background_color":"',
                  color,
                  '","name":"',
                  name,
                  '","description":"',
                  description,
                  '","image":"',
                  'data:image/svg+xml;base64,',
                  image,
                  '","attributes":"[]"}'            
              )
            )
          )
        )
      );
  }

  function setFaceAddress(address faceAddress) external {
    avatarFaceAddress = faceAddress;
  }
}

interface IAvatarFace {
  function tokenSVG(uint256 tokenId) external pure returns (string memory);
}