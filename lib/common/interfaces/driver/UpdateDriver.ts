import { Location } from "../shared/Location";
import { TimeWindow } from "../shared/TimeWindow";
import { DriverStatus } from "./DriverStatus";

export interface UpdateDriver {
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
  geo_fences?: string[];
  time_window?: TimeWindow;
  max_distance?: number;
  max_weight?: number;
  max_volume?: number;
  max_services?: number;
  start_location?: Location;
  end_location?: Location;
  provides?: string[];
  status?: DriverStatus;
  is_locked?: boolean;
  custom_fields?: Record<string, any>;
  stops?: string[];
}
