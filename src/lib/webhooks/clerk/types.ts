import { WebhookEvent } from "@clerk/nextjs/server";

export type WebhookHandler = {
  handle: (evt: WebhookEvent) => Promise<void>;
};

export type WebhookHandlers = {
  [key: string]: WebhookHandler;
};

export interface RetryableError extends Error {
  isRetryable: boolean;
}

export class WebhookError extends Error implements RetryableError {
  constructor(
    message: string,
    public isRetryable: boolean = true,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = "WebhookError";
  }
}
