import { ICRUD, ILocation, IPagination, IUserObject, TimeWindow } from "./common";

export interface IClientFlat {
  id: string;
  lat: number;
  lng: number;
}

export interface IClientConstraints {
  default_duration?: number;
  default_requires?: string[];
  default_time_windows?: TimeWindow[];
  default_volume?: number;
  default_weight?: number;
}

export interface IClientInfo {
  location?: ILocation;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  url?: string;
  reference_person?: string;
  custom_fields?: object;
}

export interface IClientBase extends ICRUD, IUserObject, IClientInfo, IClientConstraints {
  organization_id?: string;
  project_id?: string;
}

export interface IClientData extends IClientBase {
  id: string;
}

export type IClientPagination = IPagination<IClientData>;
