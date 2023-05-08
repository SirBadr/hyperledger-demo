/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// const FabCar = require('./lib/fabcar');
const User = require('./lib/user');
const HealthRecord = require('./lib/healthRecord');

module.exports.User = User;
module.exports.HealthRecord = HealthRecord;
// module.exports.FabCar = FabCar;
module.exports.contracts = [ HealthRecord, User ];
