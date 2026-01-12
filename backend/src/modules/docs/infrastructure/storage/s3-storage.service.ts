import { PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { FileStorage } from "./file-storage.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
class S3StorageService implements FileStorage {
    private client: S3Client;
    private bucket: string;

    constructor(){
        this.client = new S3Client({
            endpoint: process.env.S3_ENDPOINT,
            region: process.env.S3_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY!,
                secretAccessKey: process.env.S3_SECRET_KEY!,
            },
            forcePathStyle: true,
        });

        this.bucket = process.env.S3_BUCKET || 'documents';
    }    

    async save(path: string, buffer: Buffer): Promise<void> {
        await this.client.send(
            new PutObjectCommand({ 
                Bucket: this.bucket,
                Key: path,
                Body: buffer
            })
        )
    }

    async delete(path: string): Promise<void> {
        await this.client.send(
            new DeleteObjectCommand({
                Bucket: this.bucket,
                Key: path,
            }),
        );
    }
}

export default S3StorageService;