export interface IPlannerOptions {
  bearer?: string;
  apiEndpoint?: string;
  queryParams?: {
    [param: string]: string;
  };
}

export type TimeWindow = [number, number];

export type LanguageType = `en-us` | `es-es`;

export type ITransportModes = `car` | `truck` | `bicycle` | `pedestrian`;

export type LocalSearchMetaheuristic =
  | `AUTOMATIC`
  | `GREEDY_DESCENT`
  | `GUIDED_LOCAL_SEARCH`
  | `SIMULATED_ANNEALING`
  | `TABU_SEARCH`;

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

export interface ICRUD {
  deleted?: boolean;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface IUserObject {
  external_id?: string;
  label?: string;
}

export interface ILocation {
  original_input?: string;
  location_id?: string;
  label?: string;
  country?: string;
  country_code?: string;
  state?: string;
  county?: string;
  city?: string;
  district?: string;
  subdistrict?: string;
  block?: string;
  subblock?: string;
  street?: string;
  house_number?: string;
  postal_code?: string;
  comments?: string;
  lat?: number;
  lng?: number;
  scoring?: number;
  partial_match?: boolean;
}

export interface IOptimizerConfig {
  max_wait_time?: number;
  matrix_multiplier?: number;
  first_solution_strategy?: FirstSolutionStrategy;
  local_search_strategy?: LocalSearchMetaheuristic;
  time_limit_seconds?: number;
  lns_time_limit?: number;
  skip_penalty?: number;
  balance_services?: boolean;
  service_duration?: number;
  operation_country?: string;
  transport_mode?: ITransportModes;
}

export interface IPagination<T> {
  docs: T[];
  total: number;
  limit: number;
  page?: number;
  pages?: number;
  offset?: number;
}
