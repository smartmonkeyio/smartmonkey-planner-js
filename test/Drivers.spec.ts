import axios from "axios";
import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";
import * as loader from "./loaders/drivers.loader";
import { PlanDTO } from "../lib/common/interfaces/plan/PlanDTO";

describe(`Test Drivers API`, () => {
  let planner: Planner;
  let plan: PlanDTO;
  let allDriversIds: string[] = [];
  let allProjectIds: string[] = [];
  before(async () => {
    const apiKey = common.key;
    planner = createPlanner({ apiKey });

    const allProjects = await axios.get(`${common.backend}/projects?private_key=${planner.apiKey}`);

    allProjectIds = allProjects.status === 200 ? allProjects.data.map((project: any) => project.id) : [];

    plan = await planner.plan.create({}, allProjectIds[0]);

    // Removing all previous drivers
    const drivers = await planner.driver.search({ projectId: allProjectIds[0], limit: 1000 });
    drivers.docs.map(async (driver: any) => {
      await planner.driver.delete(driver.id);
    });
  });
  describe(`Driver CRUD`, () => {
    it(`should create a driver`, async () => {
      const driver = await planner.driver.createMany({ drivers: [loader.drivers.driver1], planId: plan.id });
      assert.strictEqual(driver[0].label, loader.drivers.driver1.label);
      assert.strictEqual(driver[0].external_id, loader.drivers.driver1.external_id);
      assert.deepStrictEqual(driver[0].time_window, loader.drivers.driver1.time_window);
      allDriversIds.push(driver[0].id);
    });
    it(`Should be able to create many drivers at a time`, async () => {
      const drivers = await planner.driver.createMany({ drivers: [{}, {}, {}], planId: plan.id });
      assert.strictEqual(drivers.length, 3);
      allDriversIds = [...allDriversIds, ...drivers.map((v) => v.id)];
    });
    it(`Should be able to retrieve a single driver`, async () => {
      const driver = await planner.driver.get(allDriversIds[0]);
      assert.strictEqual(driver.label, loader.drivers.driver1.label);
      assert.strictEqual(driver.external_id, loader.drivers.driver1.external_id);
    });
    it(`Should be able to update a driver`, async () => {
      const driver = await planner.driver.update(allDriversIds[2], {
        label: `new label`,
        price_per_distance: 123,
        price_per_minute: 456,
        start_location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(driver.label, `new label`);
      assert.strictEqual(driver.start_location?.lat, 12);
      assert.strictEqual(driver.start_location?.lng, 12);
      assert.strictEqual(driver.price_per_distance, 123);
      assert.strictEqual(driver.price_per_minute, 456);
    });
    it(`Should be able to retrieve a list of drivers`, async () => {
      const driver = await planner.driver.search({ projectId: allProjectIds[0] });
      assert.notStrictEqual(driver.docs.length, 0);
      assert.strictEqual(driver.offset, 0);
      assert.strictEqual(driver.limit, 20);
    });
    it(`Should be able to remove all previously created drivers`, async () => {
      const promises = await Promise.all(
        allDriversIds.map(async (val) => {
          const driver = await planner.driver.delete(val);
          assert.notStrictEqual(driver.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allDriversIds.length);
    });
  });
});
