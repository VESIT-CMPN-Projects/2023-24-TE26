/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
// const express = require('express');
// const app = express();
// const { Gateway, Wallets } = require('fabric-network');
// const FabricCAServices = require('fabric-ca-client');
// const path = require('path');
// const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
// const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

// const channelName = process.env.CHANNEL_NAME || 'mychannel';
// const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

// const mspOrg1 = 'Org1MSP';
// const walletPath = path.join(__dirname, 'wallet');
// const org1UserId = 'javascriptAppUser';

// function prettyJSONString(inputString) {
// 	return JSON.stringify(JSON.parse(inputString), null, 2);
// }

// // pre-requisites:
// // - fabric-sample two organization test-network setup with two peers, ordering service,
// //   and 2 certificate authorities
// //         ===> from directory /fabric-samples/test-network
// //         ./network.sh up createChannel -ca
// // - Use any of the asset-transfer-basic chaincodes deployed on the channel "mychannel"
// //   with the chaincode name of "basic". The following deploy command will package,
// //   install, approve, and commit the javascript chaincode, all the actions it takes
// //   to deploy a chaincode to a channel.

//  ./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-javascript -ccl javascript


// //         ===> from directory /fabric-samples/test-network
// //         	
// // - Be sure that node.js is installed
// //         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
// //         node -v
// // - npm installed code dependencies
// //         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
// //         npm install
// // - to run this test application
// //         ===> from directory /fabric-samples/asset-transfer-basic/application-javascript
// //         node app.js

// // NOTE: If you see  kind an error like these:
// /*
// 		2020-08-07T20:23:17.590Z - error: [DiscoveryService]: send[mychannel] - Channel:mychannel received discovery error:access denied
// 		******** FAILED to run the application: Error: DiscoveryService: mychannel error: access denied

// 	 OR

// 	 Failed to register user : Error: fabric-ca request register failed with errors [[ { code: 20, message: 'Authentication failure' } ]]
// 	 ******** FAILED to run the application: Error: Identity not found in wallet: appUser
// */
// // Delete the /fabric-samples/asset-transfer-basic/application-javascript/wallet directory
// // and retry this application.
// //
// // The certificate authority must have been restarted and the saved certificates for the
// // admin and application user are not valid. Deleting the wallet store will force these to be reset
// // with the new certificate authority.
// //

// /**
//  *  A test application to show basic queries operations with any of the asset-transfer-basic chaincodes
//  *   -- How to submit a transaction
//  *   -- How to query and check the results
//  *
//  * To see the SDK workings, try setting the logging to show on the console before running
//  *        export HFC_LOGGING='{"debug":"console"}'
//  */
// async function main() {
// 	try {
// 		// build an in memory object with the network configuration (also known as a connection profile)
// 		const ccp = buildCCPOrg1();

// 		// build an instance of the fabric ca services client based on
// 		// the information in the network configuration
// 		const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

// 		// setup the wallet to hold the credentials of the application user
// 		const wallet = await buildWallet(Wallets, walletPath);

// 		// in a real application this would be done on an administrative flow, and only once
// 		await enrollAdmin(caClient, wallet, mspOrg1);

// 		// in a real application this would be done only when a new user was required to be added
// 		// and would be part of an administrative flow
// 		await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

// 		// Create a new gateway instance for interacting with the fabric network.
// 		// In a real application this would be done as the backend server session is setup for
// 		// a user that has been verified.
// 		const gateway = new Gateway();

// 		try {
// 			// setup the gateway instance
// 			// The user will now be able to create connections to the fabric network and be able to
// 			// submit transactions and query. All transactions submitted by this gateway will be
// 			// signed by this user using the credentials stored in the wallet.
// 			await gateway.connect(ccp, {
// 				wallet,
// 				identity: org1UserId,
// 				discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
// 			});

// 			// Build a network instance based on the channel where the smart contract is deployed
// 			const network = await gateway.getNetwork(channelName);

// 			// Get the contract from the network.
// 			const contract = network.getContract(chaincodeName);

// 			// Initialize a set of asset data on the channel using the chaincode 'InitLedger' function.
// 			// This type of transaction would only be run once by an application the first time it was started after it
// 			// deployed the first time. Any updates to the chaincode deployed later would likely not need to run
// 			// an "init" type function.
// 			console.log('\n--> Submit Transaction: InitLedger, function creates the initial set of assets on the ledger');
// 			await contract.submitTransaction('InitLedger');
// 			console.log('*** Result: committed');

// 			// Let's try a query type operation (function).
// 			// This will be sent to just one peer and the results will be shown.
// 			console.log('\n--> Evaluate Transaction: GetAllAssets, function returns all the current assets on the ledger');
// 			let result = await contract.evaluateTransaction('GetAllAssets');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			// Now let's try to submit a transaction.
// 			// This will be sent to both peers and if both peers endorse the transaction, the endorsed proposal will be sent
// 			// to the orderer to be committed by each of the peer's to the channel ledger.
// 			console.log('\n--> Submit Transaction: CreateAsset, creates new asset with ID, color, owner, size, and appraisedValue arguments');
// 			result = await contract.submitTransaction('CreateAsset', 'asset313', 'yellow', '5', 'Tom', '1300');
// 			console.log('*** Result: committed');
// 			if (`${result}` !== '') {
// 				console.log(`*** Result: ${prettyJSONString(result.toString())}`);
// 			}

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns an asset with a given assetID');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset313');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			console.log('\n--> Evaluate Transaction: AssetExists, function returns "true" if an asset with given assetID exist');
// 			result = await contract.evaluateTransaction('AssetExists', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			console.log('\n--> Submit Transaction: UpdateAsset asset1, change the appraisedValue to 350');
// 			await contract.submitTransaction('UpdateAsset', 'asset1', 'blue', '5', 'Tomoko', '350');
// 			console.log('*** Result: committed');

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);

// 			try {
// 				// How about we try a transactions where the executing chaincode throws an error
// 				// Notice how the submitTransaction will throw an error containing the error thrown by the chaincode
// 				console.log('\n--> Submit Transaction: UpdateAsset asset70, asset70 does not exist and should return an error');
// 				await contract.submitTransaction('UpdateAsset', 'asset70', 'blue', '5', 'Tomoko', '300');
// 				console.log('******** FAILED to return an error');
// 			} catch (error) {
// 				console.log(`*** Successfully caught the error: \n    ${error}`);
// 			}

// 			console.log('\n--> Submit Transaction: TransferAsset asset1, transfer to new owner of Tom');
// 			await contract.submitTransaction('TransferAsset', 'asset1', 'Tom');
// 			console.log('*** Result: committed');

// 			console.log('\n--> Evaluate Transaction: ReadAsset, function returns "asset1" attributes');
// 			result = await contract.evaluateTransaction('ReadAsset', 'asset1');
// 			console.log(`*** Result: ${prettyJSONString(result.toString())}`);
// 		} finally {
// 			// Disconnect from the gateway when the application is closing
// 			// This will close all connections to the network
// 			gateway.disconnect();
// 		}
// 	} catch (error) {
// 		console.error(`******** FAILED to run the application: ${error}`);
// 		process.exit(1);
// 	}
// }


// main();


const express = require('express');
const app = express();
const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');
const cors = require("cors");
const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
	key_id: "rzp_test_euZ7U1egQIuWP9",
	key_secret: "ArJ8hiwbmr42ZpZVmsv2sMQd",
});


app.use(cors());
app.use(express.json());

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser2';
let contract;

async function initialize() {
	// Initialize gateway, wallet, and user enrollment
	const ccp = buildCCPOrg1();
	const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
	const wallet = await buildWallet(Wallets, walletPath);
	await enrollAdmin(caClient, wallet, mspOrg1);
	await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
	const gateway = new Gateway();
	await gateway.connect(ccp, {
		wallet,
		identity: org1UserId,
		discovery: { enabled: true, asLocalhost: true }
	});
	const network = await gateway.getNetwork(channelName);
	contract = network.getContract(chaincodeName);
}

// Express route for initializing the network
app.get('/initialize', async (req, res) => {
	try {
		await initialize();
		await contract.submitTransaction('InitLedger');
		res.send('Network initialized successfully');
	} catch (error) {
		res.status(500).send('Failed to initialize network: ' + error);
	}
});

// Express route for GetAllAssets
app.get('/assets', async (req, res) => {
	try {
		const result = await contract.evaluateTransaction('GetAllAssets');
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to retrieve assets: ' + error);
	}
});

// Express route for CreateAsset
app.post('/assets', async (req, res) => {
	try {
		const { challanNo, carNo, challanAmount, reason, owner, proof, status } = req.body;
		const result = await contract.submitTransaction('CreateAsset', challanNo, carNo, challanAmount, reason, owner, proof, status);
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to create asset: ' + error);
	}
});

// Express route for ReadAsset
app.get('/assets/:id', async (req, res) => {
	try {
		const result = await contract.evaluateTransaction('ReadAsset', req.params.id);
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to retrieve asset: ' + error);
	}
});

// Express route for UpdateAsset
app.put('/assets/:id', async (req, res) => {
	try {
		const { carNo, challanAmount, reason, owner, proof, status } = req.body;
		const result = await contract.submitTransaction('UpdateAsset', req.params.id, carNo, challanAmount, reason, owner, proof, status);
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to update asset: ' + error);
	}
});

// Express route for DeleteAsset
app.delete('/assets/:id', async (req, res) => {
	try {
		const result = await contract.submitTransaction('DeleteAsset', req.params.id);
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to delete asset: ' + error);
	}
});

// Express route for TransferAsset
app.put('/assets/:id/transfer', async (req, res) => {
	try {
		const { newOwner } = req.body;
		const result = await contract.submitTransaction('TransferAsset', req.params.id, newOwner);
		res.send(result.toString());
	} catch (error) {
		res.status(500).send('Failed to transfer asset: ' + error);
	}
});


app.get("/order", async (req, res) => {
	try {
		const options = {
			amount: 500 * 100, // amount == Rs 10
			currency: "INR",
			receipt: "receipt#1",
			payment_capture: 0,
			// 1 for automatic capture // 0 for manual capture
		};
		const response = await razorpay.orders.create(options);
		console.log("payment id");
		console.log(response.razorpay_payment_id);
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount,
			paymentId: response.razorpay_payment_id

		});


	} catch (err) {
		console.log(err)
		return res.status(500).json({
			message: "Something Went Wrong server",
		});
	}
});

app.post("/capture/:paymentId", (req, res) => {

	try {
		return request(
			{
				method: "POST",
				url: `https://rzp_test_euZ7U1egQIuWP9:ArJ8hiwbmr42ZpZVmsv2sMQd@api.razorpay.com/v1/payments/${req.params['paymentId']}/capture`,
				form: {
					amount: 500 * 100, // amount == Rs 10 // Same As Order amount
					currency: "INR",
				},
			},
			async function (err, response, body) {
				if (err) {
					return res.status(500).json({
						message: "Something Went Wrong",
					});
				}
				console.log("Status:", response.statusCode);
				console.log("Headers:", JSON.stringify(response.headers));
				console.log("Response:", body);
				return res.status(200).json(body);
			});
	} catch (err) {
		return res.status(500).json({
			message: "Something Went Wrong",
		});
	}
});



// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

