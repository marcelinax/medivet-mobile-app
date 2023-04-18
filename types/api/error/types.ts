export interface Error {
    error: string;
    message: string;
    statusCode: number;
}

export interface FormError {
    errors: Error[];
    field: string;
}