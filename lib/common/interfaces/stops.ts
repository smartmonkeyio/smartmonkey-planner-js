import { ICRUD, ILocation, IPagination, IUserObject, TimeWindow } from "./common";

export type IStopStatus = `completed` | `canceled` | `pending`;

export type IStopType = `pickup` | `delivery`;

export interface IStopConstraints {
  duration?: number;
  requires?: string[];
  time_windows?: TimeWindow[];
  volume?: number;
  weight?: number;
}

export interface IStopInfo {
  client_id?: string;
  client_external_id?: string;
  reference_person?: string;
  location?: ILocation;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  url?: string;
  custom_fields?: object;
}
export interface IStopTracking {
  done_at?: Date;
  done_by?: string;
  done_error?: boolean;
  done_location?: ILocation;
  feedback?: IStopReportFeedback;
  status?: IStopStatus;
}

export type StopReportTypes = `service_report_completed` | `service_report_canceled`;

export interface IStopRouteData {
  driver_id?: string;
  order?: number;
  planned_arrival_time?: number;
  planned_departure_time?: number;
  distance_to_previous_location?: number;
  distance_to_next_location?: number;
}

export interface IStopReportFeedback {
  comments?: string;
  signature?: string;
  images?: string[];
  reason?: string;
  completed_custom_fields?: object;
  canceled_custom_fields?: object;
}

export interface IStopBase extends ICRUD, IUserObject, IStopConstraints, IStopInfo, IStopTracking, IStopRouteData {
  project_id?: string;
  plan_id?: string;
  pickup_id?: string;
  type?: IStopType;
}

export interface IStopData extends IStopBase {
  id: string;
}

export interface IStopDataExtended extends IStopBase {
  id?: string;
  pickup?: IStopBase;
}

export type IStopPagination = IPagination<IStopData>;
