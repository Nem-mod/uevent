namespace NodeJS {
    interface ProcessEnv {
        NEXT_PUBLIC_API_HOST: string;
        NEXT_PUBLIC_HOST_SERVER_URL: string
        NEXT_PUBLIC_STRIPE_SECRET: string;
        GCS_CLIENT_EMAIL: string;
        GCS_CLIENT_PRIVATE_KEY: string;
        GCS_PROJECT_ID: string;
        GCS_BUCKET_NAME: string;
    }
}