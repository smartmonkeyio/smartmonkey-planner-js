import { OptimizerConfig } from "./OptimizerConfig";
import { PlanStatus } from "./PlanStatus";

export interface UpdatePlan {
  user_id: string;
  plan_id: string;
  optimizer_config?: OptimizerConfig;
  label?: string;
  status?: PlanStatus;
}
