export interface EventDTO {
  created_at: Date;
  created_by: string;
  object_id: string;
  type: string;
  meta: any;
  data?: any;
}
