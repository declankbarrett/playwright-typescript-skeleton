import fs from 'fs';
import path from 'path';

/**
 * Lightweight utility for loading JSON test data from the
 * /test-data directory. Kept intentionally simple - no caching,
 * schema validation, or external data sources.
 */
export function loadTestData<T>(fileName: string): T {
  const filePath = path.join(__dirname, '..', 'test-data', fileName);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}
