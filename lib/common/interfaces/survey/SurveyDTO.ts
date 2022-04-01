export type SurveyRatingTag = `workload` | `address_data` | `customer_experience` | `stops_order`;

export interface SurveyDTO {
  id: string;
  route_id: string;
  rating: number;
  rating_tag?: SurveyRatingTag;
  comments?: string;
  vehicle_id?: string;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateSurveyDTO {
  rating: number;
}

export interface UpdateSurveyDTO {
  rating?: number;
  rating_tag?: SurveyRatingTag;
  comments?: string;
}