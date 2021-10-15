import { TaskStatus } from "./TaskStatus";

export interface CreateTask {
  external_id?: string;
  label?: string;
  barcode?: string;
  status?: TaskStatus;
  custom_fields?: Record<string, any>;
}
