import { IPlannerOptions, Planner } from "./src/Planner";

export function createPlanner(
  apiKey: string,
  options?: IPlannerOptions
): Planner {
  return new Planner(apiKey, options || {});
}
