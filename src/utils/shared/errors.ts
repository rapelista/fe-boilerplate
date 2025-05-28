import { ErrorResponseType } from '~/types/core/response';

export class ApiError extends Error {
  public type: ErrorResponseType['type'] = 'server_error';
  public errors: ErrorResponseType['errors'] = [];
  public timestamp: ErrorResponseType['timestamp'] = '';

  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);
  }

  public fromResponse(response: ErrorResponseType) {
    this.errors = response.errors.map((error) => ({
      ...error,
      detail:
        typeof error.detail === 'string'
          ? error.detail
          : JSON.stringify(error.detail),
    }));

    this.timestamp = response.timestamp;

    this.type = response.type;
  }
}
