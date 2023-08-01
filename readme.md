# Connect Backend

Connect Backend runs using Express.js application integrated with Prisma as the ORM and the database as mysql.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js (version 18.X.X or higher)
- Prisma CLI (version 4.14.1 or higher)
- docker-compose (version 1.25.5 or higher)

## Getting Started

1.  Clone the repository:

    ```bash
    git clone https://github.com/RishivikramN/connect-backend.git
    ```

2.  Install the dependencies:

    ```bash
    cd connect-backend
    pnpm install
    ```

3.  Set up the database:

    - Create a .env file based on the .env.example file and provide your database credentials.
    - Spin up the my-sql docker image using the docker file.

    ```bash
    docker-compose up -d
    ```

4.  Start the server

    ```bash
    pnpm dev
    ```

## Folder Structure

The project structure follows a common layout for Express.js applications:

- `src/`: Contains the application source code.
  - `controllers/`: Handles the request handling logic.
  - `routes/`: Contains the route definitions.
  - `server.ts`: Contains the middlewares and server logic.
  - `index.ts`: Entry point of the application.
  - `prisma/`: Contains the Prisma schema file and migration files.
  - `package.json`: Defines project metadata and dependencies.
