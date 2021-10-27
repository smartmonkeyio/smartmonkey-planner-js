import axios from "axios";
import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";
import * as loader from "./loaders/stops.loader";
import { PlanDTO } from "../lib/common/interfaces/plan/PlanDTO";

describe(`Test Stops API`, () => {
  let planner: Planner;
  let plan: PlanDTO;
  let allStopsIds: string[] = [];
  let allProjectIds: string[] = [];
  before(async () => {
    const apiKey = common.key;
    planner = createPlanner({ apiKey });

    const allProjects = await axios.get(`${common.backend}/projects?private_key=${planner.apiKey}`);

    allProjectIds = allProjects.status === 200 ? allProjects.data.map((project: any) => project.id) : [];

    plan = await planner.plan.create({}, allProjectIds[0]);

    // Removing all previous stops
    const stops = await planner.stop.search({ projectId: allProjectIds[0], limit: 1000 });
    stops.docs.map(async (stop: any) => {
      await planner.stop.delete(stop.id);
    });
  });
  describe(`Client CRUD`, () => {
    it(`should create a stop without an assigned plan`, async () => {
      const stop = await planner.stop.createMany({ stops: [loader.stops.stop1], projectId: allProjectIds[0] });
      assert.strictEqual(stop[0].label, loader.stops.stop1.label);
      assert.strictEqual(stop[0].external_id, loader.stops.stop1.external_id);
      assert.deepStrictEqual(stop[0].time_windows, loader.stops.stop1.time_windows);
      allStopsIds.push(stop[0].id);
    });
    it(`should create a stop with an assigned plan`, async () => {
      const stop = await planner.stop.createMany({ stops: [loader.stops.stop1], planId: plan.id as string });
      assert.strictEqual(stop[0].label, loader.stops.stop1.label);
      assert.strictEqual(stop[0].external_id, loader.stops.stop1.external_id);
      assert.deepStrictEqual(stop[0].time_windows, loader.stops.stop1.time_windows);
      allStopsIds.push(stop[0].id);
    });
    it(`should create a stop with a pickup into a plan`, async () => {
      const stop = await planner.stop.createMany({
        stops: [{
          ...loader.stops.stop1,
          pickup: loader.stops.stop1,
        }],
        planId: plan.id as string
      });
      assert.strictEqual(stop[0].label, loader.stops.stop1.label);
      assert.strictEqual(stop[0].external_id, loader.stops.stop1.external_id);
      assert.deepStrictEqual(stop[0].time_windows, loader.stops.stop1.time_windows);
      allStopsIds.push(stop[0].id);
    });
    it(`Should be able to create many stops at a time`, async () => {
      const stops = await planner.stop.createMany({ stops: [{}, {}, {}], planId: plan.id });
      assert.strictEqual(stops.length, 3);
      allStopsIds = [...allStopsIds, ...stops.map((c) => c.id)];
    });
    it(`Should be able to retrieve a single stop`, async () => {
      const stop = await planner.stop.get(allStopsIds[0]);
      assert.strictEqual(stop.label, loader.stops.stop1.label);
      assert.strictEqual(stop.external_id, loader.stops.stop1.external_id);
    });
    it(`Should be able to update an unassigned stop`, async () => {
      const stop = await planner.stop.update(allStopsIds[0], {
        label: `new label`,
        location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(stop.label, `new label`);
      assert.strictEqual(stop.location?.lat, 12);
      assert.strictEqual(stop.location?.lng, 12);
    });
    it(`Should be able to update an assigned stop`, async () => {
      const stop = await planner.stop.update(allStopsIds[1], {
        label: `new label`,
        location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(stop.label, `new label`);
      assert.strictEqual(stop.location?.lat, 12);
      assert.strictEqual(stop.location?.lng, 12);
    });
    it(`Should be able to search stops`, async () => {
      const stopPagination = await planner.stop.search({ projectId: allProjectIds[0] });
      assert.notStrictEqual(stopPagination.docs.length, 0);
      assert.strictEqual(stopPagination.offset, 0);
      assert.strictEqual(stopPagination.limit, 20);
    });
    it(`Should be able to remove all previously created stops`, async () => {
      const promises = await Promise.all(
        allStopsIds.map(async (val) => {
          const stop = await planner.stop.delete(val);
          assert.notStrictEqual(stop.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allStopsIds.length);
    });
  });
});
