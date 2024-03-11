# Learn how to use transaction in typeORM with nestJS
I used to have expresJS as framework for BE in nodejs, lets try this one.

## Notes
- Better to use migration in typeORM rather than rely to the ORM sync magic, it remove old colom and create new one event if you just change the column length.
- typeORM doesn't have OOP ways to create migration, raw query is used here (that is all I know for now)
- In typeORM there is nothing like `Op.or` operator. To perform an "or criteria condition" you can use `where: [{firstname: Like("%john%")}, {email: Like("%john%")}]` it will produce `where firstname like %john% or email like %john%`. 

## Migration
For future reference, to make the migration work some changes happends in these files :
- tsconfig.build.json
- package.json

## Generate and run migration
Typeorm support generate migration automaticaly based on changes in the entity file, some script added as well to the package.json to make it more simple and easy to reminder. 
- `npm run migration:generate` will generate migration file based on changes on the entity.
- `npm run migration:run` will persist the changes to the database.

All there command will only work if `datasource.ts` is created, `datasource.ts` will be invoked by the migration script, see `package.json` file for detail. 