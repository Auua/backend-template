# backend-template

This project is a boilerplate to start with backend project.

## Stack

- NestJS
- Prisma
- MongoDB
- Postgresql
- GraphQL



## SETUP

### ENV variables

```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

Values used in docker-compose (used for local dev)
USER=<user>
PASSWORD=<password>
DB_NAME=<database_name>

PG_DATABASE_URL=postgresql://<user>:<password>@localhost:5432/<database_name>?schema=public
MONGO_DATABASE_URL=<your_mongodb.com_url>

JWT_SECRET=<your_key>
JWT_REFRESH_TOKEN=<your_key>

PORT=3000

COOKIE_SECRET=<your_key>
```

### Generate prisma schemas

````shell
npx prisma migrate dev --schema=./prisma/schema_pg.prisma  --name auth
````

````shell
 prisma generate --schema=./prisma/schema_mongo.prisma
 prisma generate --schema=./prisma/schema_pg.prisma
````

