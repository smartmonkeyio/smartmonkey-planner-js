import {
  IClientBase,
  IClientData,
  IClientFlat,
  IClientPagination,
} from "../common/interfaces/clients";
import { IStopData } from "../common/interfaces/stops";
import { Planner } from "./Planner";

interface ICreateClientsProps {
  projectId: string;
  clients: IClientBase[];
}

interface IListClientsProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  sort?: string;
}

export class Client {
  private planner: Planner;

  constructor(hw: Planner) {
    this.planner = hw;
  }

  createMany = async ({
    clients,
    projectId,
  }: ICreateClientsProps): Promise<IClientData[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.post(`clients?${params.toString()}`, clients);
  };

  update = async (
    clientId: string,
    client: IClientBase
  ): Promise<IClientData> => {
    return this.planner.put(`client/${clientId}`, client);
  };

  delete = async (clientId: string): Promise<IClientData> => {
    return this.planner.delete(`client/${clientId}`);
  };

  get = async (clientId: string): Promise<IClientData> => {
    return this.planner.get(`client/${clientId}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    sort,
  }: IListClientsProps): Promise<IClientPagination> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.planner.get(`clients/search?${params.toString()}`);
  };

  listFlat = async (projectId: string): Promise<IClientFlat[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.get(`clients/flat?${params.toString()}`);
  };

  fromStop = (stop: IStopData): IClientBase => {
    const {
      label,
      location,
      comments,
      phone,
      email,
      url,
      location_details,
      client_external_id,
      reference_person,
    } = stop;
    const newClient: IClientBase = {
      label,
      location,
      location_details,
      comments,
      phone,
      email,
      url,
      reference_person,
      external_id: client_external_id,
      default_requires: stop.requires,
      default_volume: stop.volume,
      default_weight: stop.weight,
      default_time_windows: stop.time_windows,
    };
    return Object.entries(newClient).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
