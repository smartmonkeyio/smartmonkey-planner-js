import { Location } from "../shared/Location";

export interface UpdateStop {
  client_id?: string;
  client_external_id?: string;
  label?: string;
  external_id?: string;
  status?: string;
  location?: Location;
  // Info
  location_details?: string;
  comments?: string;
  reference_person?: string;
  phone?: string;
  email?: string;
  url?: string;
  custom_fields?: Record<string, any>;

  // Constraints
  weight?: number;
  volume?: number;
  time_windows?: Array<[number, number]>;
  requires?: string[];
  duration?: number;
}
