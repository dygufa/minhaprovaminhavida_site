/*
Enviroment variable to be defined:

- MONGO_URL: As it says... the mongo URL
- PORT: The port where the application will be running
- NODE_ENV: The enviroment running the application (dev or production)
*/

require('./server/core/mongoose')
require('./server/core/router')