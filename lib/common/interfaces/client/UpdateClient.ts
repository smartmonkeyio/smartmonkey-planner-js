import { Location } from "../shared/Location";

export interface UpdateClient {
  external_id?: string;
  location?: Location;
  location_details?: string;
  label?: string;
  comments?: string;
  phone?: string;
  email?: string;
  url?: string;
  reference_person?: string;
  default_duration?: number;
  default_requires?: string[];
  default_time_windows?: Array<[number, number]>;
  default_volume?: number;
  default_weight?: number;
  custom_fields?: Record<string, any>;
}
