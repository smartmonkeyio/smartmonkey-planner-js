import { DriverDTO } from "../driver/DriverDTO";
import { GeoFenceDTO } from "../geoFence/GeoFenceDTO";
import { StopDTO } from "../stop/StopDTO";
import { OptimizerConfig } from "./OptimizerConfig";
import { TrafficOptions } from "./TrafficOptions";
import { PlanStatus } from "./PlanStatus";

export interface PlanDTO {
  id: string;
  organization_id: string;
  project_id: string;
  status: PlanStatus;
  label?: string;
  optimizer_config?: OptimizerConfig;
  traffic_options?: TrafficOptions;
  completed_stops?: number;
  incomplete_stops?: number;
  canceled_stops?: number;
  pending_stops?: number;
  total_stops?: number;
  total_drivers?: number;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
  created_by: string;
  deleted?: boolean;
  stops: StopDTO[];
  drivers: DriverDTO[];
  geo_fences: GeoFenceDTO[];
  start_date?: Date;
  end_date?: Date;
}
