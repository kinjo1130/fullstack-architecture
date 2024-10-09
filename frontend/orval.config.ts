import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      baseUrl: 'http://localhost:8080',
      mode: 'tags-split',
      target: './orval/api.ts',
      schemas: './orval/schemas',
      client: 'swr',
      httpClient: 'fetch',
      mock: true,
    },
    input: {
      target: '../backend/swagger.json',
    },
  },
});