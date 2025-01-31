interface ApiResponseProps {
    status: number;
    message: any;
}

export class ApiResponse {
    status: number;
    message: string;

    constructor({status, message}: ApiResponseProps) {
        this.status = status;
        this.message = message;
    }
}