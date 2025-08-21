# Migrations

https://www.prisma.io/docs/orm/overview/databases/cloudflare-d1#schema-migrations-with-prisma-orm-on-d1


TLDR: 

- `npx wrangler d1 migrations create estimation-corgi migration_name`
- `npx prisma migrate diff --from-local-d1  --to-schema-datamodel ./prisma/schema.prisma --script --output .\migrations\migration_file.sql`
- `npx wrangler d1 migrations apply estimation-corgi --local|remote`