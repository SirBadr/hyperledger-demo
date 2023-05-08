'use strict';

const { Contract } = require('fabric-contract-api');

class HealthRecord extends Contract {
    // chain code constructor
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const health_records = [ // create dummyy initial data
            {
                source_user: '1',
                creation_date: '08-05-2023',
                dest_user: '2',
                report_type: 2,
                report_comment: "dummy comment",
                test_id: 2,
                treatment_planDesc: "dummy description",
                treatment_planning: "dummy plan"
            },
        ];

        for (let i = 0; i < health_records.length; i++) { // insert data in states.
            health_records[i].docType = 'healthRecord';
            await ctx.stub.putState('record_id', Buffer.from('0'));
            await ctx.stub.putState('record' + '0', Buffer.from(JSON.stringify(students[i])));
            console.info('Added <--> ', health_records[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async createHealthRecord(ctx, source_user, creation_date, dest_user, report_type, report_comment, test_id, treatment_planDesc, treatment_planning) {
        console.info('============= START : Create Health Record ===========');
        let recordIdAsBytes = await ctx.stub.getState("record_id");
        recordIdAsBytes = recordIdAsBytes.toString();
        let recordIdAsInt = parseInt(recordIdAsBytes)+1;

        const healthRecord = {
            source_user: source_user,
            creation_date: creation_date,
            dest_user: dest_user,
            report_type: report_type,
            report_comment: report_comment,
            test_id: test_id,
            treatment_planDesc: treatment_planDesc,
            treatment_planning: treatment_planning
        };

        await ctx.stub.putState('record' + recordIdAsInt.toString(), Buffer.from(JSON.stringify(healthRecord)));
        await ctx.stub.putState('record_id', Buffer.from(recordIdAsInt.toString()));
        console.info('============= END : Create Health Record ===========');
    }

    async queryHealthRecord(ctx, recordNumber) { // "User"+user_id
        const recordAsBytes = await ctx.stub.getState(recordNumber); // get the car from chaincode state
        if (!recordAsBytes || recordAsBytes.length === 0) {
            throw new Error(`${recordAsBytes} does not exist`);
        }
        console.log(recordAsBytes.toString());
        return recordAsBytes.toString();
    }

    async queryAllHealthRecords(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }
}