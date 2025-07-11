import path from 'node:path';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

export const sortList = ['asc', 'desc'];

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const SWAGGER_PATH = join(__dirname, '..', '..', 'docs', 'swagger.json');
