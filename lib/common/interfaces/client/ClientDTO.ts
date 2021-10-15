import { Location } from "../shared/Location";

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
  default_time_windows?: Array<[number, number]>;
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
