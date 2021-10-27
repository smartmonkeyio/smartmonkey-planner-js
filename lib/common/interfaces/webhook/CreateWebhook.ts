import { WebhookEvent } from "./WebhookEvent";

export interface CreateWebhook {
  url: string;
  enabled?: boolean;
  enabled_events: WebhookEvent[];
}