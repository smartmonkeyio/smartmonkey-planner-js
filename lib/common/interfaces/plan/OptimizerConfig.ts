// TODO: This should be a valid object
export type LocalSearchMetaheuristic =
  | `AUTOMATIC`
  | `GREEDY_DESCENT`
  | `GUIDED_LOCAL_SEARCH`
  | `SIMULATED_ANNEALING`
  | `TABU_SEARCH`;

// TODO: This should be a valid object
export type FirstSolutionStrategy =
  | `AUTOMATIC`
  | `PATH_CHEAPEST_ARC`
  | `PATH_MOST_CONSTRAINED_ARC`
  | `EVALUATOR_STRATEGY`
  | `SAVINGS`
  | `SWEEP`
  | `CHRISTOFIDES`
  | `ALL_UNPERFORMED`
  | `BEST_INSERTION`
  | `PARALLEL_CHEAPEST_INSERTION`
  | `LOCAL_CHEAPEST_INSERTION`
  | `GLOBAL_CHEAPEST_ARC`
  | `LOCAL_CHEAPEST_ARC`
  | `FIRST_UNBOUND_MIN_VALUE`;

export interface OptimizerConfig {
  max_wait_time?: number;
  first_solution_strategy?: FirstSolutionStrategy;
  local_search_strategy?: LocalSearchMetaheuristic;
  time_limit_seconds?: number;
  lns_time_limit?: number;
  balance_services?: boolean;
  service_duration?: number;
  operation_country?: string;
  time_span_coefficient?: number;
	distance_span_coefficient?: number;
	use_distance?: boolean;
	drop_penalty?: number;
}
