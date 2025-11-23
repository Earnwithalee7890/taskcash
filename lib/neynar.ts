import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const apiKey = process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS';

export const neynarClient = new NeynarAPIClient({ apiKey });
