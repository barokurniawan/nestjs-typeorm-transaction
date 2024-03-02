# Learn how to use transaction in typeORM with nestJS
I used to have expresJS as my main framework for BE in nodejs, lets try this one.

## Notes
- Better to use migration in typeORM rather than rely to the ORM sync magic, it remove old colom and create new one event if you just change the column length.
- typeORM doesn't have OOP ways to create migration, raw query is used here (that is all I know for now)
