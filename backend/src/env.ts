import { z } from "zod";
import { config } from "dotenv";

config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    DATABASE_CLIENT: z.enum(['sqlite', 'pg']).default('sqlite'),
    DATABASE_URL: z.string()
})

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    throw Error('Invalid environment variables!');
}

export const env = _env.data;