import { Location } from "../shared/Location";
import { CreateTask } from "../task/CreateTask";
import { StopStatus } from "./StopStatus";

export interface CreateStop {
  client_id?: string;
  client_external_id?: string;
  label?: string;
  external_id?: string;
  status?: StopStatus;
  driver_id?: string;
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
  tasks?: CreateTask[];

  pickup?: Omit<CreateStop, "pickup">;
}
