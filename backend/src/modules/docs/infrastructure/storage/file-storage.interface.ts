export interface FileStorage {
    save(path: string, buffer: Buffer): Promise<void>;
    delete?(path: string): Promise<void>;
}