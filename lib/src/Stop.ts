import { IClientData } from "../common/interfaces/clients";
import { IStopBase, IStopData, IStopDataExtended, IStopPagination } from "../common/interfaces/stops";
import { Highway } from "./Highway";

interface ICreateStopsProps {
  planId?: string;
  projectId?: string 
  stops: IStopDataExtended[];
}

interface ISearchStopsProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
  deleted?: boolean;
}

export class Stop {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  createMany = async ({ stops, planId, projectId }: ICreateStopsProps): Promise<IStopData[]> => {
    const params = new URLSearchParams();
    if (planId) params.append(`plan_id`, `${planId}`);
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`stops?${params.toString()}`, stops);
  };

  fromClient = (client: IClientData): IStopBase => {
    const { id, external_id, label, location, comments, phone, email, url, reference_person } = client;
    const newStop: IStopBase = {
      label,
      location,
      comments,
      phone,
      email,
      url,
      reference_person,
      client_id: id,
      client_external_id: external_id,
      location_details: client.location_details,
      duration: client.default_duration,
      requires: client.default_requires,
      volume: client.default_volume,
      weight: client.default_weight,
      time_windows: client.default_time_windows,
      custom_fields: client.custom_fields,
    };
    return Object.entries(newStop).reduce((a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }), {});
  };

  update = async (stopId: string, stop: IStopBase): Promise<IStopData> => {
    return this.highway.put(`stop/${stopId}`, stop);
  };

  delete = async (stopId: string): Promise<IStopData> => {
    return this.highway.delete(`stop/${stopId}`);
  };

  get = async (stopID: string): Promise<IStopData> => {
    return this.highway.get(`stop/${stopID}`);
  };

  search = async ({ projectId, offset = 0, limit = 20, text, sort, deleted = false }: ISearchStopsProps): Promise<IStopPagination> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    if (sort) params.append(`sort`, `${sort}`);
    if (deleted) params.append(`deleted`, `${deleted}`);
    return this.highway.get(`stops/search?${params.toString()}`);
  };
}
