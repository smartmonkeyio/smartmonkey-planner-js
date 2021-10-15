import axios from "axios";
import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";
import * as loader from "./loaders/vehicles.loader";

describe(`Test Vehicles API`, () => {
  let planner: Planner;
  let allVehicleIds: string[] = [];
  let allProjectIds: string[] = [];
  before(async () => {
    const apiKey = common.key;
    planner = createPlanner({ apiKey });

    const allProjects = await axios.get(`${common.backend}/projects?private_key=${planner.apiKey}`);

    allProjectIds = allProjects.status === 200 ? allProjects.data.map((project: any) => project.id) : [];

    // Removing all previous vehicles
    const vehicles = await planner.vehicle.listFlat(allProjectIds[0]);
    vehicles.map(async (vehicle: any) => {
      await planner.vehicle.delete(vehicle.id);
    });
  });
  describe(`Vehicle CRUD`, () => {
    it(`should create a vehicle`, async () => {
      const vehicle = await planner.vehicle.createMany({ vehicles: [loader.vehicles.vehicle1], projectId: allProjectIds[0] });
      assert.strictEqual(vehicle[0].label, loader.vehicles.vehicle1.label);
      assert.strictEqual(vehicle[0].external_id, loader.vehicles.vehicle1.external_id);
      assert.deepStrictEqual(vehicle[0].default_time_window, loader.vehicles.vehicle1.default_time_window);
      allVehicleIds.push(vehicle[0].id);
    });
    it(`Should be able to create many vehicles at a time`, async () => {
      const vehicles = await planner.vehicle.createMany({ vehicles: [{}, {}, {}], projectId: allProjectIds[0] });
      assert.strictEqual(vehicles.length, 3);
      allVehicleIds = [...allVehicleIds, ...vehicles.map((v) => v.id)];
    });
    it(`Should be able to retrieve a single vehicle`, async () => {
      const vehicle = await planner.vehicle.get(allVehicleIds[3]);
      assert.strictEqual(vehicle.label, loader.vehicles.vehicle1.label);
      assert.strictEqual(vehicle.external_id, loader.vehicles.vehicle1.external_id);
    });
    it(`Should be able to retrieve a flat list of vehicles`, async () => {
      const clients = await planner.vehicle.listFlat(allProjectIds[0]);
      assert.strictEqual(clients.length, 7);
    });
    it(`Should be able to update a vehicle`, async () => {
      const vehicle = await planner.vehicle.update(allVehicleIds[2], {
        label: `new label`,
        price_per_distance: 123,
        price_per_minute: 456,
        default_start_location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(vehicle.label, `new label`);
      assert.strictEqual(vehicle.default_start_location?.lat, 12);
      assert.strictEqual(vehicle.default_start_location?.lng, 12);
      assert.strictEqual(vehicle.price_per_distance, 123);
      assert.strictEqual(vehicle.price_per_minute, 456);
    });
    it(`Should be able to retrieve a list of vehicles`, async () => {
      const vehicle = await planner.vehicle.search({ projectId: allProjectIds[0] });
      assert.notStrictEqual(vehicle.docs.length, 0);
      assert.strictEqual(vehicle.offset, 0);
      assert.strictEqual(vehicle.limit, 20);
    });
    it(`Should be able to remove all previously created vehicles`, async () => {
      const promises = await Promise.all(
        allVehicleIds.map(async (val) => {
          const vehicle = await planner.vehicle.delete(val);
          assert.notStrictEqual(vehicle.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allVehicleIds.length);
    });
  });
});
