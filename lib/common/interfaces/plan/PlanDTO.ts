import { DriverDTO } from "../driver/DriverDTO";
import { GeoFenceDTO } from "../geoFence/GeoFenceDTO";
import { StopDTO } from "../stop/StopDTO";
import { OptimizerConfig } from "./OptimizerConfig";

export interface PlanDTO {
  id: string;
  organization_id: string;
  project_id: string;
  status: string;
  label?: string;
  optimizer_config?: OptimizerConfig;
  completed_stops?: number;
  canceled_stops?: number;
  pending_stops?: number;
  total_stops?: number;
  total_drivers?: number;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
  created_by: string;
  deleted?: boolean; 
  stops: StopDTO[];
  drivers: DriverDTO[];
  geo_fences: GeoFenceDTO[];
}
