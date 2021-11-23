import { Location } from "../shared/Location";
import { StopStatus } from "./StopStatus";
import { TaskDTO } from "../task/TaskDTO";
import { EventDTO } from "../event/EventDTO";
import { ReportDTO } from "../report/ReportDTO";
import { TimeWindows } from "../shared/TimeWindow";

export interface StopDTO {
  id: string;
  project_id: string;
  plan_id?: string;
  client_id?: string;
  client_external_id?: string;
  label?: string;
  external_id?: string;
  type: "pickup" | "delivery";
  status: StopStatus;
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
  time_windows?: TimeWindows;
  requires?: string[];
  duration?: number;

  // Operational
  driver_id?: string;
  order?: number;
  planned_arrival_time?: number;
  planned_departure_time?: number;
  distance_to_previous_stop?: number;
  distance_to_next_stop?: number;
  estimated_arrival_time?: Date;
  estimated_departure_time?: Date;

  pickup_id?: string;
  pickup?: StopDTO;
  tasks?: TaskDTO[];
  events?: EventDTO[];
  reports?: ReportDTO[];

  // CRUD
  deleted?: boolean;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
