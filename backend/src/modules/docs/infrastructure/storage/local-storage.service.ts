import { FileStorage } from "./file-storage.interface";
import * as path from 'path';
import * as fs from 'fs/promises';
import { Injectable } from "@nestjs/common";

@Injectable()
class LocalStorageService implements FileStorage {

    async save(filePath: string, buffer: Buffer) : Promise<void> {
        const fullPath = path.join(process.cwd(), 'storage', filePath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true});
        await fs.writeFile(fullPath, buffer);
    }   

    async delete(filePath: string): Promise<void> {
        const fullPath = path.join(process.cwd(), 'storage', filePath);

        try {
            await fs.unlink(fullPath);
        } catch (err: any) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
    }

}

export default LocalStorageService