import { ICRUD, IOptimizerConfig, IPagination, IUserObject } from "./common";
import { IDriverDataExtended } from "./drivers";
import { IStopDataExtended } from "./stops";

export type PlanStatusType = `planning` | `in_progress` | `finished`;

export interface IPlanBase extends ICRUD, IUserObject {
  organization_id?: string;
  project_id?: string;
  status?: PlanStatusType;
  _version?: number;
  start_date?: Date;
  end_date?: Date;
  single_day?: boolean;
  label?: string;
  optimizer_config?: IOptimizerConfig;
  drivers?: IDriverDataExtended[];
  stops?: IStopDataExtended[];
  completed_services?: number;
  canceled_services?: number;
  pending_services?: number;
  total_services?: number;
  total_routes?: number;
}

export interface IPlanData extends IPlanBase {
  id: string;
}

export type IPlanPagination = IPagination<IPlanData>;
