import 'dotenv/config';
import { z } from 'zod';

interface IEnvs {
  PORT: string;
  NODE_ENV: string;
  DATABASE_URL: string;
  TOKEN_SECRET: string;
}

const envsSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z
    .string()
    .default('development')
    .transform((val) => val.toLowerCase()),
  DATABASE_URL: z.string(),
  TOKEN_SECRET: z.string(),
});

const { error, success, data } = envsSchema.safeParse(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

let envs: IEnvs;

if (success) {
  envs = data as IEnvs;
}

export { envs };
