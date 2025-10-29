import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/database/schemas/*',
	out: './drizzle',
    dialect: 'sqlite',
	driver: 'expo', // <--- very important
});
