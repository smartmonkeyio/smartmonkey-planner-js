export class HighwayError extends Error {
  messageId: string;
  httpsStatus: number;

  constructor(message: string, messageId: string, httpsStatus: number) {
    super(message); // (1)
    this.messageId = messageId; // (2)
    this.httpsStatus = httpsStatus; // (3)
  }
}
