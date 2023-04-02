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
                Password: "Sdmwmi1o93@)#"
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

    async createStudent(ctx, name, DoB, Password) {
        console.info('============= START : Create Student ===========');
        let useridAsBytes = await ctx.stub.getState("User_Id");
        useridAsBytes = useridAsBytes.toString();
        console.log("useridAsBytes", useridAsBytes);

        const student = {
            User_id: '1',
            User_Type_Id: 0,
            User_Name: name,
            Created_at: Date.now(),
            DoB: DoB, // day - month - year
            Password: Password
        };

        await ctx.stub.putState('User' + '1', Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from('1'));
        console.info('============= END : Create Student ===========');
    }
    
    async createDoctor(ctx, name, DoB, Password) {
        console.info('============= START : Create Doctor ===========');

        const student = {
            User_id: '2',
            User_Type_Id: 2,
            User_Name: name,
            Created_at: Date.now(),
            DoB: DoB, // day - month - year
            Password: Password
        };

        await ctx.stub.putState('User' + '2', Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from('2'));
        console.info('============= END : Create Doctor ===========');
    }

    async createPoT(ctx, name, DoB, Password) {
        console.info('============= START : Create Person Of Trust ===========');

        const student = {
            User_id: '3',
            User_Type_Id: 1,
            User_Name: name,
            Created_at: Date.now(),
            DoB: DoB, // day - month - year
            Password: Password
        };

        await ctx.stub.putState('User' + '3', Buffer.from(JSON.stringify(student)));
        await ctx.stub.putState('User_Id', Buffer.from('3'));
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
