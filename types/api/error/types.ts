export interface ApiError {
  error: string;
  message: ErrorMessage[];
  statusCode: number;
}

export interface ErrorMessage {
  message: string;
  property: string;
  resource?: Record<string, any>;
}
