# Places rest API built with ExpressJs, TypeScript and MongoDB

Before running this application, ensure you have the following installed:

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MongoDB](https://www.mongodb.com/)
- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository: `git clone https://github.com/AnimBadger/places-assignment`
2. Navigate to the project directory: `cd places-assignment`
3. Install dependencies: `npm install`

## Configuration

1. Rename `.env.example` to `.env`.
2. Modify `.env` file to configure environment variables such as database connection URL and port.

## Development

To start the development server, run

```
npm start
```

## API Endpoints

- **GET /api/v1/place**: Retrieve all places.
- **GET /api/v1/place/:placeId**: Retrieve a specific place by ID.
- **POST /api/v1/place**: Create a new place.
- **PUT /api/v1/place/:placeId**: Update a place by placeId.
- **DELETE /api/v1/place/:placeId**: Delete a place by placeId.

## Swagger

The swagger ui will be available on

```
http://localhost:{port}/api-docs
```

where port is your defined port in the .env file.
