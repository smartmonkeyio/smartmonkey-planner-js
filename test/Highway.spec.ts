import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";

describe(`Create a Planner Client`, () => {
  const privateKey = common.key;
  const token = common.token;
  let highway: Planner;

  it(`it should create a Planner privateKey`, () => {
    highway = createPlanner(privateKey);
    assert.strictEqual(highway.apiKey, privateKey);
  });
  it(`it should create a Planner token`, () => {
    highway = createPlanner(``, { bearer: token });
    assert.strictEqual(highway.token, token);
  });
  it(`it should create a both key and token`, () => {
    highway = createPlanner(privateKey, { bearer: token });
    assert.strictEqual(highway.apiKey, privateKey);
    assert.strictEqual(highway.token, token);
  });
  it(`Should fail to search plans with a wrong key`, async () => {
    try {
      highway = createPlanner(`BadKey`);
      await highway.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.httpsStatus, 401);
    }
  });
  it(`Should fail to search plans with a wrong URL`, async () => {
    try {
      highway = createPlanner(privateKey, {
        apiEndpoint: `http://localhost:1234/`,
      });
      await highway.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.messageId, `highway.bad_endpoint`);
    }
  });
  it(`Should fail to search plans with a wrong URL`, async () => {
    try {
      highway = createPlanner(privateKey, { apiEndpoint: `malformedurl` });
      await highway.plan.search({ offset: 0, limit: 20, projectId: `bad_id` });
      throw new Error(`Should raise an exception with a bad key!`);
    } catch (exception) {
      // Everything worked
      assert.strictEqual(exception.messageId, `highway.bad_endpoint`);
    }
  });
});
