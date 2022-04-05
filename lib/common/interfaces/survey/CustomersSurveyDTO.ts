export type CustomersRatingTags = `time` | `condition` | `driver` | `info`;

export interface CustomersSurveyDTO {
  id: string;
  stop_id: string;
  route_id: string;
  rating: number;
  rating_tag?: CustomersRatingTags;
  comments?: string;
  deleted?: boolean;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface CreateCustomersSurveyDTO {
  rating: number;
}

export interface UpdateCustomersSurveyDTO {
  rating?: number;
  rating_tag?: CustomersRatingTags;
  comments?: string;
}