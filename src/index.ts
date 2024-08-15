import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'
import postRoutes from './routes/posts'

const app = new Elysia()

app
  .use(swagger())
  .group('/api', (app) => app.use(postRoutes))
  .listen(process.env.PORT ?? '3000')

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
