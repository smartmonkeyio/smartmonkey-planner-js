import { UpdateClient } from "../common/interfaces/client/UpdateClient";
import { ClientDTO, ClientFlatDTO } from "../common/interfaces/client/ClientDTO";
import { PaginatedResult } from "../common/interfaces/shared/PaginatedResult";
import { Planner } from "./Planner";
import { StopDTO } from "../common/interfaces/stop/StopDTO";
import { CreateClient } from "../common/interfaces/client/CreateClient";

interface ICreateClientsProps {
  projectId: string;
  clients: CreateClient[];
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
  }: ICreateClientsProps): Promise<ClientDTO[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.post(`clients?${params.toString()}`, clients);
  };

  update = async (clientId: string, client: UpdateClient): Promise<ClientDTO> => {
    return this.planner.put(`client/${clientId}`, client);
  };

  delete = async (clientId: string): Promise<ClientDTO> => {
    return this.planner.delete(`client/${clientId}`);
  };

  get = async (clientId: string): Promise<ClientDTO> => {
    return this.planner.get(`client/${clientId}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    sort,
  }: IListClientsProps): Promise<PaginatedResult<ClientDTO>> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.planner.get(`clients/search?${params.toString()}`);
  };

  listFlat = async (projectId: string): Promise<ClientFlatDTO[]> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.get(`clients/flat?${params.toString()}`);
  };

  fromStop = (stop: StopDTO): CreateClient => {
    const {
      label,
      location,
      comments,
      phone,
      email,
      location_details,
      client_external_id,
      reference_person,
      requires,
      volume,
      weight,
      time_windows,
      max_delivery_time,
    } = stop;
    const newClient: CreateClient = {
      label,
      location,
      location_details,
      comments,
      phone,
      email,
      reference_person,
      external_id: client_external_id,
      default_requires: requires,
      default_volume: volume,
      default_weight: weight,
      default_time_windows: time_windows,
      default_max_delivery_time: max_delivery_time
    };
    return Object.entries(newClient).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };
}
