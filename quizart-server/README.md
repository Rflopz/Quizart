# quizart-server

This is a back-end for the Quiz app, this BE use [Hono](https://hono.dev/) as an alternative for express.js it run on bun (just for testing and experimenting reasons), but could be replaced with node and npm

Create a .env file with the following constants

```javascript
PORT = 3030;

/**
 * this BE use mongodb
 * runing a free tier of cloud.mongodb.com
 */
MONGODB_PWD = "";
MONGODB_USR = "";
MONGODB_CONN = cluster.example.mongodb.net;

/**
 * the secrets are base64 string
 * for authentication and json web token generations
 */
SECRET_AUTH = "";
SECRET_JWT = "";
```

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
