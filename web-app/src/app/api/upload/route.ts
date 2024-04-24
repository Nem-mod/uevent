import {NextResponse} from "next/server";
import {Storage} from "@google-cloud/storage";

export const POST = async (req: Request, res: Response) => {
    try {
        const data = await req.formData();
        const file = data.get('image') as File;
        if (!file) {
            throw new Error("File not found");
        }
        const filePath = file?.name;

        const projectId = process.env.GCS_PROJECT_ID;
        const credentials = {
            private_key: process.env.GCS_CLIENT_PRIVATE_KEY ,
            client_email: process.env.GCS_CLIENT_EMAIL,

        };

        const bucketName = process.env.GCS_BUCKET_NAME;
        const storage = new Storage({
            projectId: projectId,
            credentials: credentials
        });

        const bucket = storage.bucket(`${bucketName}`);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        await new Promise((resolve, reject) => {
            const blob = bucket.file(filePath);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            blobStream
                .on("error", (err: Error) => reject(err))
                .on("finish", () => resolve(true));

            blobStream.end(buffer);
        });

        return new NextResponse(JSON.stringify({ success: true }));
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {status: 500});
    }


}