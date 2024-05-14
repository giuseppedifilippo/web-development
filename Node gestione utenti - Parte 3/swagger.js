const swaggerAutogen = require('swagger-autogen')(openapi = "3.0.0");

const doc = {
  info: {
    title: 'Difilippo API',
    description: 'Test di API'
  },
   host: 'localhost:3000',
   components: {
    schemas: {
        userSchema: {
            $name: 'valerio',
            $surname: 'Bellandi',
            $password: 'password',
            mail: '',
        }
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */


swaggerAutogen(outputFile, routes, doc);