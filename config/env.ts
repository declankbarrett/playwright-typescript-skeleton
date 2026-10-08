/**
 * Centralised access to environment configuration.
 * Values are populated via dotenv-cli, which loads the relevant
 * .env.<environment> file before Playwright starts (see package.json scripts).
 */

export interface EnvironmentConfig {
  baseUrl: string;
  browser: string;
  headless: boolean;
  timeout: number;
}

function getEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env: EnvironmentConfig = {
  baseUrl: getEnv('BASE_URL', 'http://localhost:8081'),
  browser: getEnv('BROWSER', 'chromium'),
  headless: getEnv('HEADLESS', 'false') === 'true',
  timeout: Number(getEnv('TIMEOUT', '30000')),
};
