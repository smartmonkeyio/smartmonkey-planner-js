import * as dotenv from 'dotenv';

dotenv.config();

export const key = process.env.HIGHWAY_PRIVATE_KEY || ``;
export const token = process.env.HIGHWAY_TOKEN || ``;
export const backend = process.env.HIGHWAY_ENDPOINT || ``;
