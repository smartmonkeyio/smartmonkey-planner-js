export interface GeoFenceDTO {
  id: string;
  created_at: Date;
  created_by: string;
  project_id: string;
  color: string;
  enabled: boolean;
  label: string;
  coordinates: Array<[number, number]>;
}
