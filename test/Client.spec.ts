import axios from "axios";
import * as assert from "assert";
import { createPlanner } from "../lib/index";
import { Planner } from "../lib/src/Planner";
import * as common from "./common";
import * as loader from "./loaders/clients.loader";

describe(`Test Clients API`, () => {
  let planner: Planner;
  let allClientIds: string[] = [];
  let allProjectIds: string[] = [];
  before(async () => {
    const apiKey = common.key;
    planner = createPlanner({ apiKey });

    const allProjects = await axios.get(`${common.backend}/projects?private_key=${planner.apiKey}`);

    allProjectIds = allProjects.status === 200 ? allProjects.data.map((project: any) => project.id) : [];

    // Removing all previous clients
    const clients = await planner.client.search({ projectId: allProjectIds[0], limit: 1000 });
    clients.docs.map(async (client: any) => {
      await planner.client.delete(client.id);
    });
  });
  describe(`Client CRUD`, () => {
    it(`should create a client`, async () => {
      const client = await planner.client.createMany({ clients: [loader.clients.client1], projectId: allProjectIds[0] });
      assert.strictEqual(client[0].label, loader.clients.client1.label);
      assert.strictEqual(client[0].external_id, loader.clients.client1.external_id);
      assert.deepStrictEqual(client[0].default_time_windows, loader.clients.client1.default_time_windows);
      allClientIds.push(client[0].id);
    });
    it(`Should be able to create many clients at a time`, async () => {
      const clients = await planner.client.createMany({ clients: [{}, {}, {}], projectId: allProjectIds[0] });
      assert.strictEqual(clients.length, 3);
      allClientIds = [...allClientIds, ...clients.map((c) => c.id)];
    });
    it(`Should be able to retrieve a single client`, async () => {
      const client = await planner.client.get(allClientIds[0]);
      assert.strictEqual(client.label, loader.clients.client1.label);
      assert.strictEqual(client.external_id, loader.clients.client1.external_id);
    });
    // TODO: BACKEND IS NOT READY FOR THE MOMENT!
    // it(`Should be able to retrieve a flat list of clients`, async () => {
    //   const clients = await planner.client.listFlat(allProjectIds[0]);
    //   assert.notStrictEqual(clients.length, 0);
    // });
    it(`Should be able to update a client`, async () => {
      const client = await planner.client.update(allClientIds[0], {
        label: `new label`,
        location: {
          lat: 12,
          lng: 12,
        },
      });
      assert.strictEqual(client.label, `new label`);
      assert.strictEqual(client.location?.lat, 12);
      assert.strictEqual(client.location?.lng, 12);
    });
    it(`Should be able to retrieve a list of clients`, async () => {
      const clientPagination = await planner.client.search({ projectId: allProjectIds[0] });
      assert.notStrictEqual(clientPagination.docs.length, 0);
      assert.strictEqual(clientPagination.offset, 0);
      assert.strictEqual(clientPagination.limit, 20);
    });
    it(`Should be able to remove all previously created clients`, async () => {
      const promises = await Promise.all(
        allClientIds.map(async (val) => {
          const client = await planner.client.delete(val);
          assert.notStrictEqual(client.deleted_at, undefined);
        })
      );
      assert.strictEqual(promises.length, allClientIds.length);
    });
  });
});
