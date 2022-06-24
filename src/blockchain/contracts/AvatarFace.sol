//SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import 'base64-sol/base64.sol';

contract AvatarFace is ERC721Enumerable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdTracker;

  mapping(uint256 => string) private _tokenGeometries;
  IGeometry GEOMETRY;

  constructor(address geometryAddress) ERC721("Solid Incarnation Avatar Face", "SIAF") {
    _tokenIdTracker.increment();
    GEOMETRY = IGeometry(geometryAddress);
  }

  function mint(address recipient, uint256 geometryId) external {
    _tokenGeometries[_tokenIdTracker.current()] = GEOMETRY.getGeometry(geometryId);
    _safeMint(recipient, _tokenIdTracker.current());
    _tokenIdTracker.increment();
  }

  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    require(_exists(tokenId), "AvatarFace: Token does not exist");
    string memory name = "Avatar Face";
    string memory description = "Default Face for Solid Incarnation Avatar";

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

  function tokenSVG(uint256 tokenId) public view returns (string memory) {
    require(_exists(tokenId), "AvatarFace: Token does not exist");

    return string(abi.encodePacked(
      '<g id="face">',
        _tokenGeometries[tokenId],
        '<g id="eyes">',
          '<g id="left_eye">',
            '<ellipse cx="145" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
            '<circle cx="150" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
          '</g>',
          '<g id="right_eye">',
            '<ellipse cx="235" cy="170" rx="30" ry="35" style="fill:#ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
            '<circle cx="230" cy="170" r="15" style="fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke-width:98.2663;paint-order:markers fill stroke"/>',
          '</g>',
        '</g>',
      '</g>'
    ));
  }
}

interface IGeometry {
  function getGeometry(uint256 geometryIndex) external view returns (string memory);
}