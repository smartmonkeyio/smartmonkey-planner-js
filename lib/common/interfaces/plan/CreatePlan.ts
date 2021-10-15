import { CreateDriver } from "../driver/CreateDriver";
import { CreateStop } from "../stop/CreateStop";
import { OptimizerConfig } from "./OptimizerConfig";
import { PlanStatus } from "./PlanStatus";

export interface CoordinateDTO {
  lat: number;
  lng: number;
}

export interface CreateGeoFenceDTO {
  color: string;
  enabled: boolean;
  label: string;
  coordinates: CoordinateDTO[];
}

export interface CreatePlan {
  user_id: string;
  project_id: string;
  drivers?: CreateDriver[];
  stops?: CreateStop[];
  status?: PlanStatus;
  optimizer_config?: OptimizerConfig;
  label?: string;
}
