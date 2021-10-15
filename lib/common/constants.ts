import * as dotenv from "dotenv";

dotenv.config();

export const PLANNER_ENDPOINT =
  process.env.PLANNER_ENDPOINT || `https://api.smartmonkey.io`;
export const API_VERSION = process.env.API_VERSION || `v2`;
export const USER_AGENT = process.env.USER_AGENT || `SmartMonkeyApiClientJS`;
