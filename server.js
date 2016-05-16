/*
Enviroment variable to be defined:

- PSQL_URL: As it says... the psql URL (it's something like postgres://user:pass@localhost/dbname)
- PORT: The port where the application will be running
- NODE_ENV: The enviroment running the application (dev or production)
- AWS_ACCESS_KEY_ID 
- AWS_SECRET_ACCESS_KEY
- S3_BUCKET
*/

require('./server/core/router')