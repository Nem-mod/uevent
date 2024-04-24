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

        const projectId = '118252783024783646234';
        const credentials = {
            // client_email: 'uevent-bucket@prismatic-iris-420714.iam.gserviceaccount.com',
            // private_key: ''?.split(String.raw`\n`).join("\n")
            "type": "service_account",
            "project_id": "prismatic-iris-420714",
            "private_key_id": "713d82f6837eaf9c8d5e2a50c77a0d5b7a229a4c",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJfc0/hSH6Q50L\n8PQQOGzU8D6Fssm1YBp3n7kIrgvisiV2iYvgFs5bWNi0JLrKJm556vCIqOU1ZSqz\nbPiCevTR3ndOnHZrXxVtAwF8W2zKQnX27aFQ3W+XXMB3hPiKcwbGOTJy9riP0pRT\nEjnvLusZDa9Ciy2uJWkASYB3a+RFcwqQOc0pLCK7yViQORKC+FJK6WLvVl5nceuI\nc6N9eh0oU2a91+fNKG/yJm8t+6/jlqyc+/IjzcpYu8aBtklK93/w32X5CzK6Z0SF\nmqzwjf90S9m2lIsmMUfOmu9dyiOi5n9qi/IbaJv7n+IfmDtVHh7rlbHgrBSpj7hY\nQokHaLdXAgMBAAECggEAJRLPIZli65PmQQy4M4XWTIXZ0yrW31cL96e9WYIAsNj7\neKiNQpGfrYIW+WpqrghNOoSGdnaxGdZ/+VybCxMJmdX3mNDEHzRzEkhDzThbN4nr\n/5+wl1rvDegkh7lBK+RHQlDC3hFUWy4xWWmYnFBDNKxma3WFVa4PeFyN1StWaIqT\nOLfCxO0DwW3NeNNCcq5jhsC1pTYSQq1NIOloopdsaLFufQ93F1rbB/6gZ+rGiJKs\n5ndV1t2F8Opviw2tlqBa2GB2pH1wchtPUOVSG2xphWeiqUajySZR+XVFiJl03QtC\n7MyjbavlJQrkj3nZk237FUOTOjcWiw96DqhmBLfWXQKBgQDmGx2zvj/9ulC2JwUX\n3x1hZch8gogoDnOHAlooJ2Ykw3KOYeAD1EcWxw/9OkDzIqdCaCvRXGZ2/xzNm8X8\nYssEVCojgOf0QDU8phE25RAp7228S7kx6AQP3IH1a5s0PHK0J1IO31cXxm4c5Ld9\nj6imk3yvjUWG+836fgtWq8sHMwKBgQDgKlwg9f46gI1C5St1yPU1YSXxwLjzgsXR\nvHfmhpOKVgrCdfnRt+WYwT4zOkMAiHsLSOF80Q4080ORbJhHS7i/vpAmRDUvQ+JT\nMTn5/mcmsfeUJaxKlpCXwALa47clhpIGpCOUsuqzms9rx+Ykp+JulXWM1W05h/ee\n1S9hYSY/TQKBgGieqYmAlY2h+XJoGUu6OJyA73+UxZ0YvPQEYMNi7nEGn/4WiAiV\nqmCzzxQ+OSuSdOOfg1SkIz41TX46NfFDZbSpI6OSx2NpEgtqIeeIjCnU31q+Pwxu\nxfIEOt4/t4gvd6NrQUbbyrhXktb2MmsXNwHNiuIyZAs0T3l1d2hHoX67AoGBALh2\nAxPYeRhY+mUmwcmN0UHYrGmwRkGTxgbeCOg4q6Y1QWtdu3I42oUF15I+Ci6hIGdb\n1LlqKj+mQl6jtvdMNz4JqQLkM8OuH8qHgobWMrmjzvAoxAsotNk61t6abfZCM12l\nqeXOCNY8uRyfBSH6yJhpAq8eXV/vI/Oex/tg/yEtAoGBAN06NgjSZ3aVAerDAjv+\niD59aXXjrILvpRxGSbKRoxaScK6Tk6qqgKwcutDx6Oqtp65jN+f1COCgLhvVoA+/\nRVWjKqc8q2g5ilDR7h5I4D6bDzqqD6jI6gK+80qRbCLLjdTV3fiMUWNW2NgN8An/\nH44VdieBVRn0tbPnSzbYxMw2\n-----END PRIVATE KEY-----\n",
            "client_email": "uevent-bucket@prismatic-iris-420714.iam.gserviceaccount.com",
            "client_id": "118252783024783646234",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/uevent-bucket%40prismatic-iris-420714.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"

        };
        const bucketName = 'uevent-bucket';
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