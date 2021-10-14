import { IDriverData } from "../common/interfaces/drivers";
import { IVehicleBase, IVehicleData, IVehicleFlat, IVehiclePagination } from "../common/interfaces/vehicles";
import { Highway } from "./Highway";

interface ICreateVehiclesProps {
  projectId: string 
  vehicles: IVehicleBase[];
}

interface IListVehiclesProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
}

export class Vehicle {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  createMany = async ({ vehicles, projectId }: ICreateVehiclesProps): Promise<IVehicleData[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.highway.post(`vehicles?${params.toString()}`, vehicles);
  };

  update = async (vehicleId: string, vehicle: IVehicleBase): Promise<IVehicleData> => {
    return this.highway.put(`vehicle/${vehicleId}`, vehicle);
  };

  delete = async (vehicleId: string): Promise<IVehicleData> => {
    return this.highway.delete(`vehicle/${vehicleId}`);
  };

  get = async (vehicleID: string): Promise<IVehicleData> => {
    return this.highway.get(`vehicle/${vehicleID}`);
  };

  search = async ({ projectId, offset = 0, limit = 20, text, sort }: IListVehiclesProps): Promise<IVehiclePagination> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.highway.get(`vehicles?${params.toString()}`);
  };

  listFlat = async (projectId: string): Promise<IVehicleFlat[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.highway.get(`vehicles/flat?${params.toString()}`);
  };

  /**
   * Create a new driver from a vehicle object.
   */
  fromDriver = (driver: IDriverData): IVehicleBase => {
    const {
      end_location,
      start_location,
      max_volume,
      max_weight,
      max_services,
      provides,
      time_window,
      plate,
      vehicle_model,
      icon,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
    } = driver;

    const newVehicle: IVehicleBase = {
      default_start_location: start_location,
      default_end_location: end_location,
      default_max_volume: max_volume,
      default_max_weight: max_weight,
      default_max_services: max_services,
      default_provides: provides,
      default_time_window: time_window,
      plate,
      vehicle_model,
      icon,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_minute,
      price_per_distance,
    };
    return Object.entries(newVehicle).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {});
  };
}
