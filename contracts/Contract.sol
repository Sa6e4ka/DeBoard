// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AddContract {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    event newAdd(
        address indexed from,
        uint256 timestamp,
        string description,
        string title,
        string image,
        uint256 price
    );

    struct Add {
        uint256 timestamp;
        string title;
        string description;
        string image;
        address sender;
        uint256 price;
    }

    Add[] adds;

    function getAdds() public view returns (Add[] memory) {
        return adds;
    }

    function placeAdd(
        string memory _title,           
        string memory _description,
        uint _price, // Wei 
        string memory _image
    ) public payable {
        require(msg.value == 0.01 ether, "You must pay 0.01 ETH to place your add");

        // Исправленный порядок аргументов для структуры Add
        adds.push(Add(block.timestamp, _title, _description, _image, msg.sender, _price));

        // Отправка оплаты
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to pay for the add");

        // Исправленный порядок аргументов для события
        emit newAdd(msg.sender, block.timestamp, _description, _title, _image, _price);
    }
}