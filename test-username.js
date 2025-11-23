const { NeynarAPIClient } = require('@neynar/nodejs-sdk');

const client = new NeynarAPIClient({ apiKey: '5946964F-615A-4809-8010-1EBBAA6D5C4B' });

async function test() {
    try {
        console.log('Searching for user "dwr"...');
        const response = await client.lookupUserByUsername({ username: 'dwr' });
        console.log('Response keys:', Object.keys(response));
        if (response.result) {
            console.log('Result keys:', Object.keys(response.result));
            if (response.result.users) {
                console.log('Users found:', response.result.users.length);
                console.log('First user:', response.result.users[0]);
            }
        } else {
            console.log('Response:', response);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
