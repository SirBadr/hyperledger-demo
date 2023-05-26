/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        // console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        // console.log("identity ", identity);
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
        // const contract2 = network.getContract('user');
        // Get health records contract
        // const contract_health_record = network.getContract('healthRecord');
        const erc721_contract = network.getContract('tokenERC721');

        // Submit the specified transaction.
        // await contract2.submitTransaction('User:createStudent', 'Ehab', Date.now(), "09-07-1999", "klndfn2(!@", "encoded");
        // await contract_health_record.submitTransaction('HealthRecord:createHealthRecord',
        //     '2',
        //     '08-05-2023',
        //     '2',
        //     2,
        //     "comment3",
        //     2,
        //     "desc3",
        //     "plan3"
        // );
        // initialize nft contract
        // await erc721_contract.submitTransaction('TokenERC721Contract:Initialize', 'AUTISM TOKEN', 'ASTT');
        await erc721_contract.submitTransaction('TokenERC721Contract:MintWithTokenURI', '3', 'metadata dummy link');
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();
