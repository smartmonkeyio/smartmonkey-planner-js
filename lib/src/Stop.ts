import { ClientDTO } from "../common/interfaces/client/ClientDTO";
import { PaginatedResult } from "../common/interfaces/shared/PaginatedResult";
import { CreateStop } from "../common/interfaces/stop/CreateStop";
import { StopDTO } from "../common/interfaces/stop/StopDTO";
import { UpdateStop } from "../common/interfaces/stop/UpdateStop";
import { Planner } from "./Planner";

interface ICreateStopsProps {
  planId?: string;
  projectId?: string;
  stops: CreateStop[];
}

interface ISearchStopsProps {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  plan_id?: string | null;
  sort?: string;
  deleted?: boolean;
}

export class Stop {
  private planner: Planner;

  constructor(hw: Planner) {
    this.planner = hw;
  }

  createMany = async ({
    stops,
    planId,
    projectId,
  }: ICreateStopsProps): Promise<StopDTO[]> => {
    const params = new URLSearchParams();
    if (planId) params.append(`plan_id`, `${planId}`);
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.planner.post(`stops?${params.toString()}`, stops);
  };

  fromClient = (client: ClientDTO): CreateStop => {
    const {
      id,
      external_id,
      label,
      location,
      comments,
      phone,
      email,
      url,
      reference_person,
    } = client;
    const newStop: CreateStop = {
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
    return Object.entries(newStop).reduce(
      (a, [k, v]) => (v === undefined ? a : { ...a, [k]: v }),
      {}
    );
  };

  update = async (stopId: string, stop: UpdateStop): Promise<StopDTO> => {
    return this.planner.put(`stop/${stopId}`, stop);
  };

  delete = async (stopId: string): Promise<StopDTO> => {
    return this.planner.delete(`stop/${stopId}`);
  };

  get = async (stopID: string): Promise<StopDTO> => {
    return this.planner.get(`stop/${stopID}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    plan_id,
    sort,
    deleted = false,
  }: ISearchStopsProps): Promise<PaginatedResult<StopDTO>> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (sort) params.append(`sort`, `${sort}`);
    if (plan_id !== undefined) params.append(`plan_id`, `${plan_id}`);
    if (deleted) params.append(`deleted`, `${deleted}`);
    return this.planner.get(`stops/search?${params.toString()}`);
  };

  moveToPlan = async ({
    stopId,
    planId,
  }: {
    stopId: string;
    planId?: string;
  }): Promise<StopDTO> => {
    const params = new URLSearchParams();
    if (planId) params.append(`plan_id`, `${planId}`);
    return this.planner.post(`stop/${stopId}/move?${params.toString()}`);
  };
}
