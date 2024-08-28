# Node Restful API

This project is a Node.js-based RESTful API that provides CRUD operations for managing data.

## Installation

1. Clone the repository: `git clone https://github.com:faridvatani/node-restful-api.git`
2. Navigate to the project directory: `cd node-restful-api`
3. Install dependencies: `yarn install`

## Usage

To start the server, run the following command:

```
yarn start
```

The API will be accessible at `http://localhost:8080/api`. You can use a tool like Postman to test the API.
You can import the Postman collection from the `postman` directory to test the API.

## API Endpoints

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Log in a user
- `POST /api/auth/logout`: Log out a user
- `GET /api/users`: Get all users
- `GET /api/users/:id`: Get a specific user by ID
- `POST /api/users`: Create a new user
- `PUT /api/users/:id`: Update a user by ID
- `DELETE /api/users/:id`: Delete a user by ID

## Environment Variables

Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Ffaridvatani%2FDesktop%2Fnode-restful-api%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/Users/faridvatani/Desktop/node-restful-api/.env") file in the root directory and add the following environment variables:

```
NODE_ENV=
PORT=
CORS_ORIGIN=
MONGO_URL=
SECRET_KEY=
```

## Project Structure

```
.env
.example.env
.gitignore
nodemon.json
package.json
README.md
postman/
src/
    app.ts
    config/
        database.ts
    controllers/
        auth.controller.ts
        user.controller.ts
    helpers/
        index.ts
    middleware/
        index.ts
    models/
        user.model.ts
    routes/
        auth.routes.ts
        index.ts
        user.routes.ts
    services/
        user.service.ts
    utils/
        safeAssign.ts
tsconfig.json
```

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
