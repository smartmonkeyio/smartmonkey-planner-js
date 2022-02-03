import { Location } from "../shared/Location";
import { TaskStatus } from "../task/TaskStatus";

export type ReportType = `service_report_completed` | `service_report_canceled`;

export interface ReportTaskDTO {
  task_id: string;
  status: TaskStatus;
  custom_fields: Record<string, any>;
}

export interface ImageDTO {
  id: string;
  url: string;
}

export interface ReportDTO {
  id: string;
  stop_id: string;
  driver_id: string;
  project_id: string;
  plan_id?: string;
  type: ReportType;
  comments?: string;
  images?: ImageDTO[];
  signature?: string;
  cancel_reason?: string;
  location: Location;
  custom_fields?: Record<string, any>;
  created_at: Date;
  tasks: ReportTaskDTO[];
}
