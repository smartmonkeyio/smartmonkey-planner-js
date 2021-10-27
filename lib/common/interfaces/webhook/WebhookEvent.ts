export type WebhookEvent =
  | 'plan.created'
  | `plan.deleted`
  | `plan.updated`
  | `driver.created`
  | `driver.deleted`
  | `driver.started`
  // `driver.track` | // Disabled for the moment
  | `driver.finished`
  | `stop.created`
  | `stop.deleted`
  | `stop.report`
  | `stop.report.completed`
  | `stop.report.canceled`;