// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
	uint private seed;
	uint256 totalWaves;

	event NewWave(address indexed from, uint256 timestamp, string message);

	struct Wave {
		address waver;
		string message;
		uint256 timestamp;
	}

	mapping(address => uint256) lastWavedAt;

	Wave[] waves;

	constructor() payable {
		console.log("Hello Everyone! I hope you are all safe and sound. :) ");

		seed = (block.timestamp + block.difficulty) % 100;
	}

	function wave(string memory _message) public {
		require(block.timestamp >= lastWavedAt[msg.sender] + 15 minutes, "Trying waving after 15 mins");

		lastWavedAt[msg.sender] = block.timestamp;

		totalWaves += 1;
		console.log("%s waved w/ message %s", msg.sender, _message);

		waves.push(Wave(msg.sender, _message, block.timestamp));

		seed = (block.timestamp + block.difficulty + seed) % 100;
		console.log("Random # generated: %d", seed);

		if (seed <= 50) {
			uint prizeAmount = 0.001 ether;
			require(address(this).balance >= prizeAmount, "Trying to withdraw more money than the contract has.");
			
			(bool sent,) = msg.sender.call{value: prizeAmount}("");
			require(sent, "Failed to withdraw money from contract");
		}

		emit NewWave(msg.sender, block.timestamp, _message);
	}

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

	function getTotalWaves() public view returns(uint256) {
		console.log("We have %d total waves!", totalWaves);
		return totalWaves;
	}
}
