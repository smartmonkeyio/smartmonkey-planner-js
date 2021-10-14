import { ICRUD, ILocation, IPagination, IUserObject, TimeWindow } from "./common";
import { IStopDataExtended } from "./stops";
import { VehicleIconTypes } from "./vehicles";

export type IDriverStatus = `not_started` | `in_transit` | `finished`;

export interface IDriverInfo {
  vehicle_id?: string;
  phone?: string;
  icon?: VehicleIconTypes;
  comments?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  color?: string;
  brand?: string;
  custom_fields?: object;
  price_per_distance?: number;
  price_per_minute?: number;
}
export interface IDriverConstraints {
  time_window?: TimeWindow;
  max_distance?: number;
  max_weight?: number;
  max_volume?: number;
  max_services?: number;
  start_location?: ILocation;
  end_location?: ILocation;
  provides?: string[];
}

export interface IDriverTracking {
  start_date?: Date;
  end_date?: Date;
  planned_track?: string;
  planned_start_time?: number;
  planned_end_time?: number;
  real_track?: string;
  status?: IDriverStatus;
}

export interface IDriverBase extends ICRUD, IUserObject, IDriverInfo, IDriverTracking, IDriverConstraints {
  project_id?: string;
  plan_id?: string;
  vehicle_id?: string;
  is_locked?: boolean;
  tracing_percent?: number;
}

export interface IDriverData extends IDriverBase {
  id: string;
}

export interface IDriverDataExtended extends IDriverData {
  stops: IStopDataExtended[];
}

export type IDriverPagination = IPagination<IDriverData>;
