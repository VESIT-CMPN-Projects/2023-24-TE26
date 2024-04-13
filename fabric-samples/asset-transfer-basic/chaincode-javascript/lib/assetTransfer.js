/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ChallanNo: "123456789120",
                CarNo: "MH12AC2730",
                ChallanAmount: 2000,
                Reason: 'OverSpeed',
                Owner: "sadhak",
                Proof: "VideoLink",
                Status: "waiting"
            },
            {
                ChallanNo: "123456789121",
                CarNo: "MH12AC2731",
                ChallanAmount: 2200,
                Reason: "Illegal Parking",
                Owner: "john",
                Proof: "ImageLink",
                Status: "waiting"
            },
            {
                ChallanNo: "123456789122",
                CarNo: "MH12AC2732",
                ChallanAmount: 1800,
                Reason: "No Seat Belt",
                Owner: "jane",
                Proof: "DocumentLink",
                Status: "waiting"
            },
            {
                ChallanNo: "123456789123",
                CarNo: "MH12AC2733",
                ChallanAmount: 2500,
                Reason: 'OverSpeed',
                Owner: "michael",
                Proof: "VideoLink",
                Status: "waiting"
            },
            {
                ChallanNo: "123456789124",
                CarNo: "MH12AC2734",
                ChallanAmount: 2100,
                Reason: 'OverSpeed',
                Owner: "alice",
                Proof: "ImageLink",
                Status: "waiting"
            },
            {
                ChallanNo: "123456789125",
                CarNo: "MH12AC2735",
                ChallanAmount: 1900,
                Reason: 'OverSpeed',
                Owner: "bob",
                Proof: "DocumentLink",
                Status: "waiting"
            }
        ]

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            await ctx.stub.putState(asset.ChallanNo, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, challanNo, carNo, challanAmount, reason, owner, proof, status) {
        const exists = await this.AssetExists(ctx, challanNo);
        if (exists) {
            throw new Error(`The asset ${challanNo} already exists`);
        }

        const asset = {
            ChallanNo: challanNo,
            CarNo: carNo,
            ChallanAmount: challanAmount,
            Reason: reason,
            Owner: owner,
            Proof: proof,
            Status: status
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(challanNo, Buffer.from(stringify(sortKeysRecursive(asset))));
        return JSON.stringify(asset);
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, challanNo) {
        const assetJSON = await ctx.stub.getState(challanNo); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${challanNo} does not exist`);
        }
        return assetJSON.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(ctx, challanNo, carNo, challanAmount, reason, owner, proof, status) {
        const exists = await this.AssetExists(ctx, challanNo);
        if (!exists) {
            throw new Error(`The asset ${challanNo} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ChallanNo: challanNo,
            CarNo: carNo,
            ChallanAmount: challanAmount,
            Reason: reason,
            Owner: owner,
            Proof: proof,
            Status: status
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(challanNo, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, challanNo) {
        const exists = await this.AssetExists(ctx, challanNo);
        if (!exists) {
            throw new Error(`The asset ${challanNo} does not exist`);
        }
        return ctx.stub.deleteState(challanNo);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, challanNo) {
        const assetJSON = await ctx.stub.getState(challanNo);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(ctx, challanNo, newOwner) {
        const assetString = await this.ReadAsset(ctx, challanNo);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(challanNo, Buffer.from(stringify(sortKeysRecursive(asset))));
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
