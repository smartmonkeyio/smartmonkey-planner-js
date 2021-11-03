import { DriverDTO } from "../common/interfaces/driver/DriverDTO";
import { PaginatedResult } from "../common/interfaces/shared/PaginatedResult";
import { CreateVehicle } from "../common/interfaces/vehicle/CreateVehicle";
import { VehicleDTO, VehicleFlatDTO } from "../common/interfaces/vehicle/VehicleDTO";
import { Planner } from "./Planner";

interface ICreateVehiclesProps {
  projectId: string;
  vehicles: CreateVehicle[];
}

interface IListVehiclesProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
}

export class Vehicle {
  private planner: Planner;

  constructor(hw: Planner) {
    this.planner = hw;
  }

  createMany = async ({
    vehicles,
    projectId,
  }: ICreateVehiclesProps): Promise<VehicleDTO[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.post(`vehicles?${params.toString()}`, vehicles);
  };

  // TODO:
  update = async (vehicleId: string, vehicle: any): Promise<VehicleDTO> => {
    return this.planner.put(`vehicle/${vehicleId}`, vehicle);
  };

  delete = async (vehicleId: string): Promise<VehicleDTO> => {
    return this.planner.delete(`vehicle/${vehicleId}`);
  };

  get = async (vehicleID: string): Promise<VehicleDTO> => {
    return this.planner.get(`vehicle/${vehicleID}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    sort,
  }: IListVehiclesProps): Promise<PaginatedResult<VehicleDTO>> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.planner.get(`vehicles?${params.toString()}`);
  };

  listFlat = async (projectId: string): Promise<VehicleFlatDTO[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.get(`vehicles/flat?${params.toString()}`);
  };

  /**
   * Create a new driver from a vehicle object.
   */
  fromDriver = (driver: DriverDTO): CreateVehicle => {
    const {
      end_location,
      start_location,
      max_volume,
      max_weight,
      max_services,
      provides,
      time_window,
      plate,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
      geo_fences,
    } = driver;

    const newVehicle: CreateVehicle = {
      default_start_location: start_location,
      default_end_location: end_location,
      default_max_volume: max_volume,
      default_max_weight: max_weight,
      default_max_services: max_services,
      default_provides: provides,
      default_time_window: time_window,
      default_geo_fences: geo_fences,
      plate,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
    };
    return Object.entries(newVehicle).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
