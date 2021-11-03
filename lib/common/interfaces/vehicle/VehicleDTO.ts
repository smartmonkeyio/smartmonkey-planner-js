import { Location } from "../shared/Location";
import { TimeWindow } from "../shared/TimeWindow";

export interface VehicleDTO {
  id: string;
  organization_id: string;
  project_id: string;
  external_id?: string;
  label?: string;
  phone?: string;
  email?: string;
  plate?: string;
  vehicle_model?: string;
  color?: string;
  brand?: string;
  comments?: string;
  default_time_window?: TimeWindow;
  default_max_distance?: number;
  default_max_weight?: number;
  default_max_volume?: number;
  default_max_services?: number;
  default_start_location?: Location;
  default_end_location?: Location;
  default_provides?: string[];
  default_geo_fences?: string[];
  custom_fields?: Record<string, any>;
  price_per_distance?: number;
  price_per_minute?: number;

  // CRUD
  deleted?: boolean;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface VehicleFlatDTO {
  id: string;
  lat: number;
  lng: number;
}
