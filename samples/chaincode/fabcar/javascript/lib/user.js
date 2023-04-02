/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class User extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const students = [
            {
                User_id: '0',
                User_Type_Id: 2,
                User_Name:"Mahmoud",
                Created_at: "12993989",
                DoB: "09-01-1999", // day - month - year
                Password: "Sdmwmi1o93@)#",
                //TODO: add encoded voice data property
                encodedData: ""
            },
        ];

        for (let i = 0; i < students.length; i++) {
            students[i].docType = 'student';
            await ctx.stub.putState('User_Id', Buffer.from('0'));
            await ctx.stub.putState('User' + '0', Buffer.from(JSON.stringify(students[i])));
            console.info('Added <--> ', students[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryStudent(ctx, studentNumber) { // "User"+user_id
        const studentAsBytes = await ctx.stub.getState(studentNumber); // get the car from chaincode state
        if (!studentAsBytes || studentAsBytes.length === 0) {
            throw new Error(`${studentNumber} does not exist`);
        }
        console.log(studentAsBytes.toString());
        return studentAsBytes.toString();
    }

    async createStudent(ctx, name, createdAt, DoB, Password, encodedData) {
        console.info('============= START : Create Student ===========');
        let useridAsBytes = await ctx.stub.getState("User_Id");
        useridAsBytes = useridAsBytes.toString();
        let userIdAsInt = parseInt(useridAsBytes)+1;

        const student = {
            User_id: userIdAsInt,
            User_Type_Id: 0,
            User_Name: name,
            Created_at: createdAt,
            DoB: DoB, // day - month - year
            Password: Password,
            encodedData: encodedData
        };

        await ctx.stub.putState('User' + userIdAsInt.toString(), Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from(userIdAsInt.toString()));
        console.info('============= END : Create Student ===========');
    }
    
    async createDoctor(ctx, name, createdAt, DoB, Password) {
        console.info('============= START : Create Doctor ===========');
        let useridAsBytes = await ctx.stub.getState("User_Id");
        useridAsBytes = useridAsBytes.toString();
        let userIdAsInt = parseInt(useridAsBytes)+1;

        const student = {
            User_id: userIdAsInt,
            User_Type_Id: 2,
            User_Name: name,
            Created_at: createdAt,
            DoB: DoB, // day - month - year
            Password: Password,
            encodedData: encodedData
        };

        await ctx.stub.putState('User' + userIdAsInt.toString(), Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from(userIdAsInt.toString()));
        console.info('============= END : Create Doctor ===========');
    }

    async createPoT(ctx, name, createdAt, DoB, Password) {
        console.info('============= START : Create Person Of Trust ===========');
        let useridAsBytes = await ctx.stub.getState("User_Id");
        useridAsBytes = useridAsBytes.toString();
        let userIdAsInt = parseInt(useridAsBytes)+1;

        const student = {
            User_id: userIdAsInt,
            User_Type_Id: 1,
            User_Name: name,
            Created_at: createdAt,
            DoB: DoB, // day - month - year
            Password: Password,
            encodedData: encodedData
        };

        await ctx.stub.putState('User' + userIdAsInt.toString(), Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from(userIdAsInt.toString()));
        console.info('============= END : Create Person Of Trust ===========');
    }

    async queryAllStudents(ctx) {
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

    // async changeStudentJob(ctx, studentNumber, newJob) {
    //     console.info('============= START : changeStudentJob ===========');

    //     const studentAsBytes = await ctx.stub.getState(studentNumber); // get the car from chaincode state
    //     if (!studentAsBytes || studentAsBytes.length === 0) {
    //         throw new Error(`${studentNumber} does not exist`);
    //     }
    //     const student = JSON.parse(studentAsBytes.toString());
    //     student.job = newJob;

    //     await ctx.stub.putState(studentNumber, Buffer.from(JSON.stringify(student)));
    //     console.info('============= END : changeStudentJob ===========');
    // }

}

module.exports = User;
