export type DriversRatingTag = `workload` | `address_data` | `customer_experience` | `stops_order`;

export interface DriversSurveyDTO {
  id: string;
  route_id: string;
  rating: number;
  rating_tag?: DriversRatingTag;
  comments?: string;
  vehicle_id?: string;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateDriversSurveyDTO {
  rating: number;
}

export interface UpdateDriversSurveyDTO {
  rating?: number;
  rating_tag?: DriversRatingTag;
  comments?: string;
}