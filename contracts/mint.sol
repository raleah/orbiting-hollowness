//SPDX-License-Identifier: None
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract mint is Ownable, ERC721Enumerable{
    using Counters for Counters.Counter;

    mapping(address => uint) public balances;

    constructor(
        string memory name,
        string memory symbol,
        uint256 maxSupply //,
        //uint256 maxGiftable,
        //uint256 maxPresale,
        address payable _withdrawAddress;
    ) ERC721 ("Orbiter", "AUSTRONAUT"){
        maxSupply = 10;
        //maxGiftable = 1;
        //maxPresale = 2;
        withdrawAddress = _withdrawAddress;
    }

    function mint(uint256 ) public payable{
        uint supply = totalSupply();
        for (uint256 i; i < mintCounter; i++){
            _safeMint(msg.sender, supply + i);
            balances[msg.sender]++;
        }

    }

}