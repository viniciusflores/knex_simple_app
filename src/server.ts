import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'
import { transactionsRoutes } from './routes/transactions.routes'

const app = fastify()

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  console.log(tables)

  return `Hello World`
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running in port 3333! 🚀')
})
