import { WebhookEvent } from "./WebhookEvent";

export interface UpdateWebhook {
  url?: string;
  enabled?: boolean;
  enabled_events?: WebhookEvent[];
  failure_count?: number;
}
