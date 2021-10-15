import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";

describe(`Create a Planner Client`, () => {
  const privateKey = common.key;
  const token = common.token;
  let planner: Planner;

  it(`it should create a Planner privateKey`, () => {
    planner = createPlanner({ apiKey: privateKey });
    assert.strictEqual(planner.apiKey, privateKey);
  });
  it(`it should create a Planner token`, () => {
    planner = createPlanner({ apiKey: ``, options: { bearer: token }});
    assert.strictEqual(planner.token, token);
  });
  it(`it should create a both key and token`, () => {
    planner = createPlanner({ apiKey: privateKey, options: { bearer: token }});
    assert.strictEqual(planner.apiKey, privateKey);
    assert.strictEqual(planner.token, token);
  });
  it(`Should fail to search plans with a wrong key`, async () => {
    try {
      planner = createPlanner({ apiKey: `BadKey`});
      await planner.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.httpsStatus, 401);
    }
  });
  it(`Should fail to search plans with a wrong URL`, async () => {
    try {
      planner = createPlanner({ apiKey: privateKey, options: {
        apiEndpoint: `http://localhost:1234/`,
      }});
      await planner.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.messageId, `planner.bad_endpoint`);
    }
  });
  it(`Should fail to search plans with a wrong URL`, async () => {
    try {
      planner = createPlanner({ apiKey: privateKey, options: { apiEndpoint: `malformedurl` }});
      await planner.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.messageId, `planner.bad_endpoint`);
    }
  });
});
