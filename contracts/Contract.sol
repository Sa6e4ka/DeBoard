// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AddContract {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    event NewAdd(
        address indexed from,
        string description,
        string title,
        string image,
        uint256 price
    );

    struct Add {
        string title;
        string description;
        string image;
        address sender;
        uint256 price;
    }

    Add[] public adds;

    function getAdds(uint start, uint count) public view returns (Add[] memory) {
        require(start < adds.length, "Start index out of bounds");
        uint end = start + count > adds.length ? adds.length : start + count;
        uint addsCount = end - start;
        
        Add[] memory addsSubset = new Add[](addsCount);
        for (uint i = 0; i < addsCount; i++) {
            addsSubset[i] = adds[start + i];
        }
        return addsSubset;
    }

    function placeAdd(
        string memory _title,           
        string memory _description,
        uint256 _price, // В Wei 
        string memory _image
    ) public payable {
        require(msg.value == 0.01 ether, "You must pay 0.01 ETH to place your ad");

        // Добавляем объявление в массив
        adds.push(Add({
            title: _title, 
            description: _description, 
            image: _image, 
            sender: msg.sender, 
            price: _price
        }));

        // Перевод оплаты владельцу
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to pay for the ad");

        // Генерация события
        emit NewAdd(msg.sender, _description, _title, _image, _price);
    }
}
