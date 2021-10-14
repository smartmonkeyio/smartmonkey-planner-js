import { IWebhook, IWebhookCreate, IWebhookEdit } from '../common/interfaces/webhooks';
import { Highway } from './Highway';

export class Webhook {
  private highway: Highway;

  constructor(hw: Highway) {
    this.highway = hw;
  }

  create = async (webhook: IWebhookCreate, projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.post(`webhook?${params.toString()}`, webhook);
  };

  update = async (webhookId: string, webhook: IWebhookEdit): Promise<IWebhook> => {
    return this.highway.put(`webhook/${webhookId}`, webhook);
  };

  delete = async (webhookId: string) => {
    return this.highway.delete(`webhook/${webhookId}`);
  };

  test = async (webhookId: string, eventType: string): Promise<IWebhook> => {
    return this.highway.post(`webhook/${webhookId}/test`, { event_type: eventType });
  };

  getAll = async (projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.highway.get(`webhooks?${params.toString()}`);
  };
}
