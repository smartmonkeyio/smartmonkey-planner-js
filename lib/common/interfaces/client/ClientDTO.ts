import { Location } from "../shared/Location";
import { TimeWindows } from "../shared/TimeWindow";

export interface ClientDTO {
  id: string;
  organization_id?: string;
  project_id?: string;
  label?: string;
  external_id?: string;
  location?: Location;
  location_details?: string;
  comments?: string;
  phone?: string;
  email?: string;
  url?: string;
  reference_person?: string;
  default_duration?: number;
  default_requires?: string[];
  default_time_windows?: TimeWindows;
  default_volume?: number;
  default_weight?: number;
  custom_fields?: Record<string, any>;

  // CRUD
  deleted?: boolean;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface ClientFlatDTO {
  id: string;
  lat: number;
  lng: number;
}