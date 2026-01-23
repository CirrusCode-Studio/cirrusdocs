import axios from "axios";
import FormData from "form-data";

export class PyComputeClient {
    constructor(private readonly baseUrl: string) {}

    async post(path: string, buffer: Buffer): Promise<any> {
        const form = new FormData();
        form.append('file', buffer, 'file');

        const res = await axios.post(
            `${this.baseUrl}${path}`,
            form,
            { headers: form.getHeaders() }
        );

        return res.data;
    }
}