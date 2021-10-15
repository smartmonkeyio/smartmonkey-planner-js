import * as dotenv from 'dotenv';

dotenv.config();

export const key = process.env.PLANNER_PRIVATE_KEY || ``;
export const token = process.env.PLANNER_TOKEN || ``;
export const backend = process.env.PLANNER_ENDPOINT || ``;
