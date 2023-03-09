# 02-api-rest-nodejs

## Database

Our tool of database is KNEX.js;

#### Create a new migration

```
yarn knex migrate:make <migration-name>
```

#### Run all migrations


```
yarn knex migrate:latest
```

#### Roolback of migration


```
yarn knex migrate:rollback
```


///

# RF

- [ ] O usuário deve poder criar uma nova transação;
- [ ] O usuário deve poder obter um resumo da sua conta;
- [ ] O usuário deve poder listar todas transações que já ocorreram;
- [ ] O usuário deve poder visualizar uma transação única;

# RN

- [ ] A transação pode ser do tipo crédito que somará ao valor total, ou débito subtrairá;
- [ ] Deve ser possível identificarmos o usuário entre as requisições;
- [ ] O usuário só pode visualizar transações o qual ele criou;
