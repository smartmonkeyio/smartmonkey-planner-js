import { TaskStatus } from "./TaskStatus";

export interface TaskDTO {
  id: string;
  stop_id: string;
  status: TaskStatus;
  label?: string;
  barcode?: string;
  comments?: string;

  custom_fields?: Record<string, any>;

  // CRUD
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
