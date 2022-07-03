# Trading volume distribution using BF law

Benford's law stock API using Nestjs.

## Requirements

- [NodeJS](https://nodejs.org/en/)
- Git
- Docker

A few things to note in the project:
* **[Github Actions Workflows](https://github.com/thatshailesh/modusbox-test/blob/master/.github/workflows)** - Pre-configured Github Actions to run automated builds and publish image to Github Packages
* **[Dockerfile](https://github.com/thatshailesh/modusbox-test/blob/master/Dockerfile)** - Dockerfile to generate docker builds.
* **[Docker-compose](https://github.com/thatshailesh/modusbox-test/blob/master/docker-compose.yml)** - Docker compose script to build and start container.
* **[OpenAPI 3.0 Spec](#Swagger)** - A starter template to get started with API documentation using OpenAPI 3.0. This API spec is also available when running the development server at `http://localhost:3000/swagger-api`
* **[.env file for configuration](#environment)** - Change server config like app port, mongo url etc
* **Jest** - Using Jest for running test cases

## Getting Started

- Clone the repo
- `cd /modusbox-test && npm install`

### Configuring env variables
Create `.env` files and add the relevant values for the variables.
Note: Find used env vars in `.sample-env` 

## Development

### Start dev server
```
npm start
```

Running the above commands results in 
* 🌏**API Server** running at `http://localhost:3000`
* ⚙️**Swagger UI** at `http://localhost:3000/swagger-api`

## Packaging and Deployment
### Build and run with docker
```
docker-compose build
docker-compose up
```

### Deployment
Deployment is automated with Github Actions and deployed on heroku

#### Heroku Public Url
```
https://modusbox.herokuapp.com/
```
## Testing the application


### Unit test
```
npm run test
```

### E2E test
```
npm run test:e2e
```

### Coverage
```
npm run test:cov
```
