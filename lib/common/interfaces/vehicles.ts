import { ICRUD, ILocation, IPagination, IUserObject, TimeWindow } from "./common";

export interface IVehicleFlat {
  id: string;
  lat: number;
  lng: number;
}

export type VehicleIconTypes = `moto` | `walk` | `truck` | `furgo`;

export interface IVehicleConstraints {
  default_time_window?: TimeWindow;
  default_max_distance?: number;
  default_max_weight?: number;
  default_max_volume?: number;
  default_max_services?: number;
  default_provides?: string[];
}

export interface IVehicleInfo {
  phone?: string;
  icon?: VehicleIconTypes;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  color?: string;
  brand?: string;
  comments?: string;
  default_start_location?: ILocation;
  default_end_location?: ILocation;
  custom_fields?: any;
  price_per_distance?: number;
  price_per_minute?: number;
}

export interface IVehicleBase extends ICRUD, IUserObject, IVehicleInfo, IVehicleConstraints {
  organization_id?: string;
  project_id?: string;
}

export interface IVehicleData extends IVehicleBase {
  id: string;
}

export type IVehiclePagination = IPagination<IVehicleData>;
