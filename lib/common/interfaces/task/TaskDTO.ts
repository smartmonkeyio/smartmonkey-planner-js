export interface TaskDTO {
  id: string;
  stop_id: string;
  status: string;
  external_id?: string;
  label?: string;
  barcode?: string;

  custom_fields?: Record<string, any>;

  // CRUD
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
