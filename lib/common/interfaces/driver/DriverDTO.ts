import { Location } from "../shared/Location";
import { StopDTO } from "../stop/StopDTO";
import { DriverStatus } from "./DriverStatus";

export interface DriverDTO {
  id: string;
  plan_id: string;
  project_id: string;
  external_id?: string;
  vehicle_id?: string;
  label?: string;
  phone?: string;
  comments?: string;
  email?: string;
  plate?: string;
  color?: string;
  vehicle_model?: string;
  brand?: string;
  time_window?: [number, number];
  max_distance?: number;
  max_weight?: number;
  max_volume?: number;
  max_services?: number;
  start_location?: Location;
  end_location?: Location;
  provides?: string[];
  start_date?: Date;
  end_date?: Date;
  status: DriverStatus;
  real_track?: string;
  is_locked?: boolean;
  planned_track?: string;
  planned_start_time?: number;
  planned_end_time?: number;

  price_per_distance?: number;
  price_per_minute?: number;

  tracing_percent?: number;
  custom_fields?: Record<string, any>;

  stops: StopDTO[];

  // CRUD
  deleted?: boolean;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
