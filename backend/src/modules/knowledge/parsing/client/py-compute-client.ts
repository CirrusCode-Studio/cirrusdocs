import axios from "axios";
import FormData from "form-data";

export class PyComputeClient {
    constructor(private readonly baseUrl: string) {}

    async postFile<T>(
        path: string,
        file: Buffer,
        filename = 'file'
    ): Promise<T> {
        const form = new FormData();
        form.append('file', file, filename);

        const res = await axios.post(
            `${this.baseUrl}${path}`,
            form,
            { headers: form.getHeaders(), timeout: 60_000 }
        );

        return res.data as T;
    }

    async postBlocks<T>(
        path: string,
        payload: {
            doc_id: string;
            blocks: unknown[];
        }
    ): Promise<T> {
        const res = await axios.post(
            `${this.baseUrl}${path}`,
            payload,
            {
                headers: { 'Content-Type': 'application/json' },
                timeout: 60_000,
            }
        );

        return res.data as T;
    }
}
