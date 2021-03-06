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
  geo_fences?: string[];
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
      location_details,
      default_duration,
      default_requires,
      default_volume,
      default_weight,
      default_time_windows,
      custom_fields,
      default_max_delivery_time,
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
      location_details: location_details,
      duration: default_duration,
      requires: default_requires,
      volume: default_volume,
      weight: default_weight,
      time_windows: default_time_windows,
      custom_fields: custom_fields,
      max_delivery_time: default_max_delivery_time,
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

  deleteMany = async (stopIds: string[]): Promise<StopDTO[]> => {
    return this.planner.put(`stops/delete`, { stop_ids: stopIds });
  };

  get = async (stopID: string): Promise<StopDTO> => {
    return this.planner.get(`stop/${stopID}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    geo_fences,
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
    if (geo_fences)
      geo_fences.forEach((gf) => params.append(`geo_fences`, `${gf}`));
    return this.planner.get(`stops/search?${params.toString()}`);
  };

  moveToPlan = async ({
    stopIds,
    planId,
  }: {
    stopIds: string[];
    planId?: string;
  }): Promise<StopDTO> => {
    const params = new URLSearchParams();
    if (planId) params.append(`plan_id`, `${planId}`);
    return this.planner.post(`stop/move?${params.toString()}`, { stop_ids: stopIds });
  };
}
