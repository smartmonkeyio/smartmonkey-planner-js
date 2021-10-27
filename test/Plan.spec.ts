import axios from "axios";
import * as assert from "assert";
//import * as loader from "./loader";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";

describe(`Test Plans API`, () => {
  let planner: Planner;
  let allProjectIds: string[] = [];
  const allPlanIds: string[] = [];
  let plan: any;

  before(async () => {
    const apiKey = common.key;
    planner = createPlanner({ apiKey });

    const allProjects = await axios.get(`${common.backend}/projects?private_key=${planner.apiKey}`);

    allProjectIds = allProjects.status === 200 ? allProjects.data.map((project: any) => project.id) : [];
    
    // Removing all previous plans
    const plans = await planner.plan.search({ projectId: allProjectIds[0], limit: 1000 });
    plans.docs.map(async (plan: any) => {
      console.log(`plan.id`, plan.id);
      await planner.plan.delete(plan.id);
    });
  });
  describe(`Basic Plan CRUD`, () => {
    it(`it should create a new Plan`, async () => {
      plan = await planner.plan.create({ stops: [], drivers: [] }, allProjectIds[0]);
      assert.strictEqual(plan.label, undefined);
      assert.notStrictEqual(plan.created_at, undefined);
      allPlanIds.push(plan.id);
    });
    it(`it should create a new Plan with project id`, async () => {
      plan = await planner.plan.create({ stops: [], drivers: [] }, allProjectIds[0]);
      assert.strictEqual(plan.label, undefined);
      assert.notStrictEqual(plan.created_at, undefined);
      allPlanIds.push(plan.id);
    });
    it(`it should be able to retrieve the recently created plan`, async () => {
      plan = await planner.plan.get(allPlanIds[0]);
      assert.strictEqual(plan.label, undefined);
      assert.notStrictEqual(plan.created_at, undefined);
    });
    it(`it should be able to update the plan`, async () => {
      plan = await planner.plan.update(allPlanIds[0], {
        label: `manolo`,
        stops: [],
        drivers: [],
      });
      assert.strictEqual(plan.label, `manolo`);
    });
    it(`Optimize must do nothig with an empty list`, async () => {
      plan = await planner.plan.optimize(allPlanIds[0]);
      assert.strictEqual(plan.label, `manolo`);
      assert.strictEqual(plan.stops.length, 0);
      assert.strictEqual(plan.drivers.length, 0);
    });
    it(`Must be able to create stops for a plan`, async () => {
      plan = await planner.plan.addStops(allPlanIds[0], [{}, {}]);
      assert.strictEqual(plan.stops.length, 2);
    });
    it(`Must be able to create drivers for a plan`, async () => {
      plan = await planner.plan.addDrivers(allPlanIds[0], [{}, {}]);
      assert.strictEqual(plan.drivers.length, 2);
    });
    it(`Must be able to optimize drivers of the current plan`, async function () {
      this.timeout(10000);

      plan = await planner.plan.optimize(allPlanIds[0]);
      assert.strictEqual(plan.drivers.length, 2);
      assert.strictEqual(plan.stops.length, 2);
    });
    it(`Must retrieve the list of plans`, async () => {
      const planList = await planner.plan.search({
        offset: 0,
        limit: 20,
        projectId: allProjectIds[0],
      });
      assert.strictEqual(planList.docs.length, 2);
      assert.strictEqual(planList.offset, 0);
      assert.strictEqual(planList.limit, 20);
    });
    it(`Must retrieve the list of plans without setting the project id`, async () => {
      const planList = await planner.plan.search({ projectId: allProjectIds[0], offset: 0, limit: 20 });
      assert.strictEqual(planList.docs.length, 2);
      assert.strictEqual(planList.offset, 0);
      assert.strictEqual(planList.limit, 20);
    });
    it(`Should be able to remove all previously created plans`, async () => {
      const promises = await Promise.all(
        allPlanIds.map(async (val) => {
          const client = await planner.plan.delete(val);
          assert.notStrictEqual(client.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allPlanIds.length);
    });
  });
});
