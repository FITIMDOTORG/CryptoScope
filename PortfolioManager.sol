// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PortfolioManager {
    struct Portfolio {
        string name;
        string[] assets;
        uint256[] holdings;
    }

    mapping(address => Portfolio[]) public userPortfolios;

    function createPortfolio(string memory name, string[] memory assets, uint256[] memory holdings) public {
        require(assets.length == holdings.length, "Assets and holdings must match in length");
        Portfolio memory newPortfolio = Portfolio(name, assets, holdings);
        userPortfolios[msg.sender].push(newPortfolio);
    }

    function getPortfolios() public view returns (Portfolio[] memory) {
        return userPortfolios[msg.sender];
    }
}
