import axios from "axios";
import { API_VERSION, PLANNER_ENDPOINT } from "../common/constants";
import { PlannerError } from "../common/errors";
import { IPlannerOptions } from "../common/interfaces/common";
import { Client } from "./Client";
import { Plan } from "./Plan";
import { Driver } from "./Driver";
import { Stop } from "./Stop";
import { Vehicle } from "./Vehicle";
import { Webhook } from "./Webhook";

export class Planner {
  private _token?: string;
  private _apiKey: string;
  private apiEndpoint: string;
  private queryParams: { [param: string]: string } | undefined;

  client: Client;
  webhook: Webhook;
  plan: Plan;
  driver: Driver;
  stop: Stop;
  vehicle: Vehicle;

  constructor(apiKey: string, options: IPlannerOptions) {
    this._token = options.bearer;
    this._apiKey = apiKey;
    this.client = new Client(this);
    this.webhook = new Webhook(this);
    this.plan = new Plan(this);
    this.driver = new Driver(this);
    this.stop = new Stop(this);
    this.vehicle = new Vehicle(this);
    this.apiEndpoint = options.apiEndpoint || PLANNER_ENDPOINT;
    this.queryParams = options.queryParams;
  }

  private _request = async (
    method: (url: string, data: any, headers?: any) => Promise<any>,
    url: string,
    data?: any,
    headers?: any
  ) => {
    try {
      if (data) {
        return (
          await method(
            `${this.apiEndpoint}/${API_VERSION}/${url}`,
            data || {},
            {
              params: {
                ...(this._apiKey ? { private_key: this._apiKey } : {}),
                ...(this.queryParams ? this.queryParams : {}),
              },
              headers: {
                ...headers,
                ...(!this._apiKey
                  ? { Authorization: `Bearer ${this._token}` }
                  : {}),
              },
            }
          )
        ).data;
      } else {
        return (
          await method(`${this.apiEndpoint}/${API_VERSION}/${url}`, {
            params: {
              ...(this._apiKey ? { private_key: this._apiKey } : {}),
              ...(this.queryParams ? this.queryParams : {}),
            },
            headers: {
              ...headers,
              ...(!this._apiKey
                ? { Authorization: `Bearer ${this._token}` }
                : {}),
            },
          })
        ).data;
      }
    } catch (error: any) {
      if (error.code === `ENOTFOUND` || error.code === `ECONNREFUSED`) {
        throw new PlannerError(
          `${error.code} - api endpoint is not correctly set`,
          `planner.bad_endpoint`,
          0
        );
      }
      const { data, status } = error.response;
      throw new PlannerError(
        `${status} - ${data.message}`,
        data.messageId,
        status
      );
    }
  };

  post = async (url: string, data: any = {}, headers: any = {}) => {
    return this._request(axios.post, url, data, headers);
  };

  get = async (url: string, headers: any = {}) => {
    return this._request(axios.get, url, undefined, headers);
  };

  delete = async (url: string, headers: any = {}) => {
    return this._request(axios.delete, url, undefined, headers);
  };

  put = async (url: string, data: any = {}, headers: any = {}) => {
    return this._request(axios.put, url, data, headers);
  };

  get apiKey(): string {
    return this._apiKey;
  }
  get token(): string | void {
    return this._token;
  }
}
