import { z } from 'zod';
const schema = z.object({
  NODE_ENV:z.enum(['development','test','production']).default('development'),
  API_PORT:z.coerce.number().int().positive().default(4000),
  WEB_ORIGIN:z.string().url(), DATABASE_URL:z.string().min(1), REDIS_URL:z.string().url(),
  SUPABASE_URL:z.string().url(),
  SESSION_SECRET:z.string().min(32), DEFAULT_TENANT_SLUG:z.string().min(1),
});
export type AppConfig = z.infer<typeof schema>;
export function loadConfig(environment:NodeJS.ProcessEnv = process.env):AppConfig { return schema.parse(environment); }
