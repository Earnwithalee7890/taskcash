const { NeynarAPIClient } = require('@neynar/nodejs-sdk');
const client = new NeynarAPIClient({ apiKey: 'NEYNAR_API_DOCS' });
console.log("Trying fetchBulkUsers:");
client.fetchBulkUsers({ fids: [3] }).then(res => console.log("Success bulk:", JSON.stringify(res, null, 2))).catch(err => console.error("Error bulk:", err.message));
