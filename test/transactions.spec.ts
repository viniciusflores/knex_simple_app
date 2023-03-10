import { test, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('yarn knex migrate:rollback --all')
    execSync('yarn knex migrate:latest')
  })

  test('Create a interaction', async () => {
    const response = await request(app.server).post('/transactions').send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })

    expect(response.statusCode).toEqual(201)
  })

  test('Get all interaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction to get',
        amount: 500,
        type: 'credit',
      })
      .expect(201)

    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        id: expect.any(String),
        title: 'New Transaction to get',
        amount: 500,
      }),
    ])
  })

  test('Get a specific interaction', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'New Transaction to get',
        amount: 500,
        type: 'credit',
      })
      .expect(201)

    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)

    const id = listTransactionsResponse.body.transactions[0].id

    const transactionsResponse = await request(app.server)
      .get(`/transactions/${id}`)
      .set('Cookie', cookie)
      .expect(200)

    expect(transactionsResponse.body.transaction).toEqual(
      expect.objectContaining({
        id,
        title: 'New Transaction to get',
        amount: 500,
      }),
    )
  })

  test('Get summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'credit transaction',
        amount: 500,
        type: 'credit',
      })
      .expect(201)

    const cookie = createTransactionResponse.get('Set-Cookie')

    await request(app.server)
      .post('/transactions')
      .set('Cookie', cookie)
      .send({
        title: 'debit transaction',
        amount: 50,
        type: 'debit',
      })
      .expect(201)

    const response = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookie)
      .expect(200)

    expect(response.body.summary).toEqual({
      amount: 450,
    })
  })
})
