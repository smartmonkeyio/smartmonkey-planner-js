import { Location } from "../shared/Location";
import { TimeWindow } from "../shared/TimeWindow";

export interface CreateVehicle {
  external_id?: string;
  location?: Location;
  label?: string;
  plate?: string;
  comments?: string;
  phone?: string;
  email?: string;
  color?: string;
  default_start_location?: Location;
  default_end_location?: Location;
  default_provides?: string[];
  default_time_window?: TimeWindow;
  default_max_volume?: number;
  default_max_weight?: number;
  default_max_services?: number;
  default_max_distance?: number;
	default_min_distance?: number;
	default_max_time?: number;
	default_min_time?: number;
  default_geo_fences?: string[];
  custom_fields?: any;
  price_per_distance?: number;
  price_per_minute?: number;
}
