import { IDriverBase, IDriverData, IDriverPagination } from "../common/interfaces/drivers";
import { IVehicleData } from "../common/interfaces/vehicles";
import { Highway } from "./Highway";

interface ICreateDriversProps {
  planId: string;
  drivers: IDriverBase[];
}

interface ISearchDriversProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
}

export class Driver {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  createMany = async ({ drivers, planId }: ICreateDriversProps): Promise<IDriverData[]> => {
    const params = new URLSearchParams();
    params.append(`plan_id`, `${planId}`);
    return this.highway.post(`drivers?${params.toString()}`, drivers);
  };

  /**
   * Create a new driver from a vehicle object.
   */
  fromVehicle = (vehicle: IVehicleData): IDriverBase => {
    const {
      id,
      default_end_location,
      default_start_location,
      default_max_distance,
      default_max_volume,
      default_max_weight,
      default_provides,
      default_time_window,
      default_max_services,
      plate,
      vehicle_model,
      icon,
      color,
      brand,
      phone,
      label,
      email,
      custom_fields,
      price_per_distance,
      price_per_minute,
    } = vehicle;

    return {
      vehicle_id: id,
      start_location: default_start_location,
      end_location: default_end_location,
      max_distance: default_max_distance,
      max_volume: default_max_volume,
      max_weight: default_max_weight,
      max_services: default_max_services,

      provides: default_provides,
      time_window: default_time_window,
      plate,
      vehicle_model,
      icon,
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

  update = async (driverId: string, driver: IDriverBase): Promise<IDriverData> => {
    return this.highway.put(`driver/${driverId}`, driver);
  };

  delete = async (driverId: string): Promise<IDriverData> => {
    return this.highway.delete(`driver/${driverId}`);
  };

  get = async (driverId: string): Promise<IDriverData> => {
    return this.highway.get(`driver/${driverId}`);
  };

  optimize = async (driverId: string): Promise<IDriverData> => {
    return this.highway.post(`driver/${driverId}/optimize`);
  };

  search = async ({ projectId, offset = 0, limit = 20, text, sort }: ISearchDriversProps): Promise<IDriverPagination> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.highway.get(`drivers/search?${params.toString()}`);
  };
}
