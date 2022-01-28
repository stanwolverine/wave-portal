const main = async () => {
	const [owner, randomPerson] = await hre.ethers.getSigners();

	// @dev HRE => Hardhat Runtime Environment
	// @dev compile our contract and generate the necessary files we need to work with our contract under the artifacts directory.
	const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

	// @dev Hardhat will create a local Ethereum network for us, but just for this contract.
	// Then, after the script completes it'll destroy that local network.
	// So, every time you run the contract, it'll be a fresh blockchain.
	// const waveContract = await waveContractFactory.deploy();
	// OR
	// Deploy With ethers
	const waveContract = await waveContractFactory.deploy({ value: hre.ethers.utils.parseEther("0.1") });

	// @dev Wait until our contract is officially deployed to our local blockchain!
	await waveContract.deployed();

	// @dev Once it's deployed waveContract.address will basically give us the address of the deployed contract
	console.log("Contract deployed to:", waveContract.address);
	console.log("Contract deployed by:", owner.address);


   	// Get Contract balance
	let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	let waveCount;
	waveCount = await waveContract.getTotalWaves();
	console.log(waveCount.toNumber());

	let waveTxn = await waveContract.wave("Hello DON");
	await waveTxn.wait(); // Doubt

	// Get Contract balance
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

	waveCount = await waveContract.getTotalWaves();

	waveTxn = await waveContract.connect(randomPerson).wave("Yooooo MaStER"); // Doubt in connect fnc
  	await waveTxn.wait();

	// Get Contract balance
	contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
	console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));

  	// waveCount = await waveContract.getTotalWaves();
	let allWaves = await waveContract.getAllWaves();
  	console.log(allWaves);

	waveTxn = await waveContract.wave("This is Spam Wave");
	await waveTxn.wait();
};

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

runMain();