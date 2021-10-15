import { Location } from "../shared/Location";

export interface CreateClient {
  external_id?: string;
  location?: Location;
  location_details?: string;
  label?: string;
  comments?: string;
  phone?: string;
  email?: string;
  website?: string;
  reference_person?: string;
  default_duration?: number;
  default_requires?: string[];
  default_time_windows?: TimeWindows;
  default_volume?: number;
  default_weight?: number;
  custom_fields?: Record<string, any>;
}
