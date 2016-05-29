# Minha prova, minha vida (MPMV)

"Minha prova minha vida" is a repository developed using Angular 2, Node.js, Webpack and Postgres to help college students finding study material like exams from previous years.

## Development

### Requirements:

* Node.js
* Webpack
* Postgres
* Gulp

### Get the code:
```
git clone https://github.com/dygufa/minhaprovaminhavida.git
cd minhaprovaminhavida
npm install
```

### Define the environment variables
```
cp .env.example .env
nano .env
```

### Commands:

- `npm run build` will build the angular 2 app into /src/build (production);
- `npm run start` will start a express webserver (mpmv.js) using nodemon (production);
- `npm run dev` will start a express webserver (mpmv.js) using nodemon and a webpack-dev-server. The ports for both of them can be defined on .env.

## Todos (by priority)

1. ~~Remove dev code from router.ts;~~
2. ~~Fix building process for production;~~
3. Allow user to add university and course;
4. Implement validation on the forms and authorization on the routes (node and angular);- 
5. Allow administrator to review files before making it public;
6. Implement virus verification on the files before making it public using [clamscan](https://www.npmjs.com/package/clamscan);
7. User interface;
8. Implement server renderization using [Universal](https://universal.angular.io/).

