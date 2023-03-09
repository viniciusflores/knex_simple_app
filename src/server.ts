import fastify from 'fastify'
import crypto from 'node:crypto'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const tables = await knex('sqlite_schema').select('*')

  console.log(tables)

  return `Hello World`
})

app.post('/transactions', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de Teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.get('/transactions', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app.get('/transactions/123', async () => {
  const transactions = await knex('transactions')
    .where('amount', 500)
    .select('*')

  return transactions
})

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is running in port 3333! 🚀')
})
