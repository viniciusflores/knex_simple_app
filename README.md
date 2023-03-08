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
