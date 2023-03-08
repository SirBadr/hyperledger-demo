/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabCar = require('./lib/fabcar');
const FabCar2 = require('./lib/fabcar2');

module.exports.FabCar2 = FabCar2;
module.exports.FabCar = FabCar;
module.exports.contracts = [ FabCar, FabCar2 ];
