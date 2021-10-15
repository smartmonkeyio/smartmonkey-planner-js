import { Planner } from "./Planner";

export class Webhook {
  constructor(private planner: Planner) {}

  // create = async (webhook: IWebhookCreate, projectId?: string) => {
  //   const params = new URLSearchParams();
  //   if (projectId) params.append(`project_id`, `${projectId}`);
  //   return this.planner.post(`webhook?${params.toString()}`, webhook);
  // };

  // update = async (
  //   webhookId: string,
  //   webhook: IWebhookEdit
  // ): Promise<IWebhook> => {
  //   return this.planner.put(`webhook/${webhookId}`, webhook);
  // };

  // delete = async (webhookId: string) => {
  //   return this.planner.delete(`webhook/${webhookId}`);
  // };

  // test = async (webhookId: string, eventType: string): Promise<IWebhook> => {
  //   return this.planner.post(`webhook/${webhookId}/test`, {
  //     event_type: eventType,
  //   });
  // };

  getAll = async (projectId?: string) => {
    const params = new URLSearchParams();
    if (projectId) params.append(`project_id`, `${projectId}`);
    return this.planner.get(`webhooks?${params.toString()}`);
  };
}
