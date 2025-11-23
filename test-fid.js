const { NeynarAPIClient } = require('@neynar/nodejs-sdk');

const client = new NeynarAPIClient({ apiKey: '5946964F-615A-4809-8010-1EBBAA6D5C4B' });

async function test() {
    try {
        console.log('Fetching user by FID 3...');
        const response = await client.fetchBulkUsers({ fids: [3] });
        console.log('Response keys:', Object.keys(response));
        if (response.users) {
            console.log('Users found:', response.users.length);
            console.log('First user:', response.users[0]);
        } else {
            console.log('Response:', response);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

test();
