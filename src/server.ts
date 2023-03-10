import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions.routes'

const app = fastify()

app.register(cookie)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/hello', async () => {
  console.log('Hello route is called')
  return `Hello World`
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running in port 3333! 🚀')
})
