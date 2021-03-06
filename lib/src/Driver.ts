import { CreateDriver } from "../common/interfaces/driver/CreateDriver";
import { DriverDTO } from "../common/interfaces/driver/DriverDTO";
import { UpdateDriver } from "../common/interfaces/driver/UpdateDriver";
import { PaginatedResult } from "../common/interfaces/shared/PaginatedResult";
import { StopDTO } from "../common/interfaces/stop/StopDTO";
import { Planner } from "./Planner";

interface ICreateDriversProps {
  planId: string;
  drivers: CreateDriver[];
}

interface ISearchDriversProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
}

export class Driver {
  private planner: Planner;

  constructor(hw: Planner) {
    this.planner = hw;
  }

  createMany = async ({
    drivers,
    planId,
  }: ICreateDriversProps): Promise<DriverDTO[]> => {
    const params = new URLSearchParams();
    params.append(`plan_id`, `${planId}`);
    return this.planner.post(`drivers?${params.toString()}`, drivers);
  };

  /**
   * Create a new driver from a vehicle object.
   */
  fromVehicle = (vehicle: any): CreateDriver => {
    const {
      id,
      default_end_location,
      default_start_location,
      default_max_distance,
      default_min_distance,
      default_max_time,
      default_min_time,
      default_max_volume,
      default_max_weight,
      default_provides,
      default_time_window,
      default_max_services,
      default_geo_fences,
      plate,
      vehicle_model,
      color,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_distance,
      price_per_minute,
      external_id,
    } = vehicle;

    return {
      vehicle_id: id,
      status: "not_started",
      start_location: default_start_location,
      end_location: default_end_location,

      max_distance: default_max_distance,
      min_distance: default_min_distance,
      max_time: default_max_time,
      min_time: default_min_time,
      max_volume: default_max_volume,
      max_weight: default_max_weight,
      max_services: default_max_services,
      
      provides: default_provides,
      geo_fences: default_geo_fences,
      time_window: default_time_window,
      external_id,
      plate,
      vehicle_model,
      color,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_distance,
      price_per_minute,
    };
  };

  update = async (
    driverId: string,
    driver: UpdateDriver
  ): Promise<DriverDTO> => {
    return this.planner.put(`driver/${driverId}`, driver);
  };

  delete = async (driverId: string): Promise<DriverDTO> => {
    return this.planner.delete(`driver/${driverId}`);
  };

  get = async (driverId: string): Promise<DriverDTO> => {
    return this.planner.get(`driver/${driverId}`);
  };

  optimize = async (
    driverId: string
  ): Promise<{ driver: DriverDTO; unassigned_stops: StopDTO[] }> => {
    return this.planner.post(`driver/${driverId}/optimize`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    sort,
  }: ISearchDriversProps): Promise<PaginatedResult<DriverDTO>> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.planner.get(`drivers/search?${params.toString()}`);
  };
}
