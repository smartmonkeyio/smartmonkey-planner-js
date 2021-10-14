# Installation

You can add the library using npm or yarn:

```bash
npm install @smartmonkey/planner --save
```

or:

```bash
yarn add @smartmonkey/planner
```

# Quickstart

To use planner services you need to create a User and an API Key in our site: https://planner.smartmonkey.io/h/settings/developers/api-keys

Now you can use the services by just using:

```js
const { createPlanner } = require("@smartmonkey/planner");
const planner = createPlanner(YOUR_API_KEY);
```

# Running tests

To run test you'll need to declare an environment variable `PLANNER_PRIVATE_KEY` with a working key created in our webpage (You can just move `.env-example` to `.env`). Then just run the tests with:

```bash
npm run test
```
