/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const FabCar = require('./lib/fabcar');
// const User = require('./lib/user');
// const HealthRecord = require('./lib/healthRecord');
const TokenERC721Contract = require('./lib/tokenERC721');

// module.exports.User = User;
// module.exports.HealthRecord = HealthRecord;
module.exports.TokenERC721Contract = TokenERC721Contract;
// module.exports.FabCar = FabCar;
module.exports.contracts = [ TokenERC721Contract ];
// module.exports.contracts = [ HealthRecord ];
// module.exports.contracts = [ HealthRecord, User ];
