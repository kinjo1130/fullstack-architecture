import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      baseUrl: process.env.NODE_ENV === "development" ? 'http://localhost:8080': process.env.NEXT_PUBLIC_API_URL,
      mode: 'tags-split',
      target: './orval/api.ts',
      schemas: './orval/schemas',
      client: 'swr',
      httpClient: 'fetch',
      mock: true,
    },
    input: {
      target: '../swagger.json',
    },
  },
});