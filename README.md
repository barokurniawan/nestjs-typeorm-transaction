# Learn how to use transactions in typeORM with nestJS
I used to have expresJS as a framework for BE in nodejs, let's try this one.

## Notes
- Better to use migration in typeORM rather than rely on the ORM sync magic, it removes old colom and creates new one event if you just change the column length.
- TypeORM support create migration based on changes in the entity files.
- In typeORM there is nothing like `Op.or` operator. To perform an "or criteria condition" you can use `where: [{firstname: Like("%john%")}, {email: Like("%john%")}]` it will produce `where firstname like %john% or email like %john%`. 

## Migration
For future reference, to make the migration work some changes happen in these files :
- tsconfig.build.json
- package.json

### Generate and run migration
TypeORM support generates migration automatically based on changes in the entity file, some scripts were added to the `package.json` to make it simpler and easy to remember. 
- `npm run migration:generate` will generate a migration file based on changes on the entity.
- `npm run migration:run` will persist the changes to the database.

All these commands will only work if `datasource.ts` is created, `datasource.ts` will be invoked by the migration script, see `package.json` file for details. 

### Run and Generate seeder
Command to run and generate seeder are configured in `package.json` file.
- Run seeder by `npm run seed:run`. Required `datasource.ts` file.
- Generate seeder by `npm run seed:create -- --name your-seeder-name`.
