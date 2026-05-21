const requiredEnvVars = [
    "MONGO_URL",
    "CLOUD_NAME",
    "CLOUD_API_KEY",
    "CLOUD_API_SECRET",
    "MAIL_USER",
    "MAIL_PASS",
    "MAIL_TO"
];

export function validateEnv() {
    const missing = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missing.length > 0) {
        console.error("CRITICAL ERROR: Missing required environment variables:");
        missing.forEach(m => console.error(` - ${m}`));
        process.exit(1);
    }
}
