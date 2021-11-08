import { OptimizerConfig } from "./OptimizerConfig";
import { PlanStatus } from "./PlanStatus";
import { TrafficOptions } from "./TrafficOptions";

export interface UpdatePlan {
  user_id: string;
  plan_id: string;
  optimizer_config?: OptimizerConfig;
  label?: string;
  status?: PlanStatus;
  traffic_options?: TrafficOptions;
}
