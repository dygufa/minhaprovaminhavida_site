/*
Enviroment variable to be defined:

- PSQÇ_URL: As it says... the psql URL (it's something like postgres://user:pass@localhost/dbname)
- PORT: The port where the application will be running
- NODE_ENV: The enviroment running the application (dev or production)
*/

require('./server/core/router')