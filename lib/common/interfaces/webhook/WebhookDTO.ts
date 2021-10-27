import { WebhookEvent } from "./WebhookEvent";

export interface WebhookDTO {
  id: string;
  url?: string;
  enabled?: boolean;
  enabled_events?: WebhookEvent[]; // This is a array of string because is not posible to create an array of types WebhookTypes.

  project_id?: string;
  organization_id?: string;

  failure_count?: number;

  // CRUD
  deleted?: boolean;
  created_by: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}