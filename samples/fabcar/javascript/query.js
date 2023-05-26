/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        // const contract = network.getContract('fabcar');
        // console.log("contract 1", contract)
        // const contract2 = network.getContract('fabcar', 'user');
        // console.log(contract2);
        // Get health records contract

        let tokenERC721 = network.getContract('tokenERC721');
        // const contract_health_record = network.getContract('healthRecord');
        // console.log("contract contract_health_record", contract_health_record)

        // Evaluate the specified transaction.
        // const result2 = await contract2.evaluateTransaction('User:queryAllStudents');
        
        // Get all records
        // const results = await contract_health_record.evaluateTransaction('HealthRecord:queryAllHealthRecords')
        const results = await tokenERC721.evaluateTransaction('TokenERC721Contract:ClientAccountBalance');
        console.log(`Car Transaction has been evaluated, result is: ${results.toString()}`);

        // const result_health_record = await tokenERC721.evaluateTransaction('TokenERC721Contract:queryAllHealthRecords');
        // console.log(`Car Transaction has been evaluated, result is: ${result_health_record.toString()}`);
        
        
        // console.log(`Health Record Transaction has been evaluated, result is: ${result_health_record}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();
