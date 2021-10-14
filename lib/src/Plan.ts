import {
  IPlanBase,
  IPlanData,
  IPlanPagination,
} from "../common/interfaces/plans";
import { IDriverBase } from "../common/interfaces/drivers";
import { IStopBase } from "../common/interfaces/stops";
import { Planner } from "./Planner";

export type IListPlansProps = {
  projectId: string;
  offset?: number;
  limit?: number;
  text?: string;
  status?: string;
  fromDate?: string;
  toDate?: string;
  sort?: string;
};

export class Plan {
  private planner: Planner;

  constructor(hw: Planner) {
    this.planner = hw;
  }

  create = async (
    planData: IPlanBase,
    projectId: string
  ): Promise<IPlanData> => {
    const params = new URLSearchParams();
    params.append(`project_id`, `${projectId}`);
    return this.planner.post(`plan?${params.toString()}`, planData);
  };

  update = async (planId: string, plan: IPlanBase): Promise<IPlanData> => {
    return this.planner.put(`plan/${planId}`, plan);
  };

  delete = async (planId: string): Promise<IPlanData> => {
    return this.planner.delete(`plan/${planId}`);
  };

  get = async (planId: string): Promise<IPlanData> => {
    return this.planner.get(`plan/${planId}`);
  };

  search = async ({
    projectId,
    offset = 0,
    limit = 20,
    text,
    status,
    fromDate,
    toDate,
    sort,
  }: IListPlansProps): Promise<IPlanPagination> => {
    const params = new URLSearchParams();
    params.append(`project_id`, projectId);
    params.append(`offset`, `${offset}`);
    params.append(`limit`, `${limit}`);
    if (text) params.append(`text`, `${text}`);
    if (status) params.append(`status`, `${status}`);
    if (fromDate) params.append(`fromDate`, `${fromDate}`);
    if (toDate) params.append(`toDate`, `${toDate}`);
    if (sort) params.append(`sort`, `${sort}`);
    return this.planner.get(`plans?${params.toString()}`);
  };

  optimize = async (planId: string): Promise<IPlanData> => {
    return this.planner.post(`plan/${planId}/optimize`);
  };

  optimizeAsync = async (
    planId: string
  ): Promise<{
    finished: boolean;
    status: `in progress` | `success` | `failed`;
  }> => {
    return this.planner.post(`plan/${planId}/optimize/async`);
  };

  addStops = async (planId: string, stops: IStopBase[]): Promise<IPlanData> => {
    await this.planner.stop.createMany({ stops, planId });
    return this.get(planId);
  };

  addDrivers = async (
    planId: string,
    drivers: IDriverBase[]
  ): Promise<IPlanData> => {
    await this.planner.driver.createMany({ drivers, planId });
    return this.get(planId);
  };
}
