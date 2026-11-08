# HW1 - Student LMS REST API

**Durim Memishi - dm31650**  
Branch: `hw1/dm31650`

Based on the instructor's `TE_EN/Week4/student-lms` example (Express, Sequelize, SQLite). The original `name` and `email` student fields and singular `POST /student` path are preserved. This project adds GET by ID, PUT, DELETE, input validation, and automated integration tests.

## Run

Requires Node.js 22 or newer.

```sh
cd TE_EN/DM31650/HW1/student-lms
npm ci
npm start
```

The API listens at `http://localhost:3005`. On first startup Sequelize creates `students.sqlite` and its `Students` table. The database is local and ignored by Git. `PORT` and `DB_STORAGE` may be set as environment variables. Table initialization finishes before requests are accepted.

## Endpoints

- `GET /students`: 200 with the student array.
- `GET /students/:id`: 200 with one student; 404 if absent.
- `POST /student`: 201 with the created student and a `Location` header.
- `PUT /students/:id`: 200 with the updated student; 404 if absent.
- `DELETE /students/:id`: 200 with a success message and deleted ID; 404 if absent.

For POST and PUT, select **Body > raw > JSON** in Postman:

```json
{
  "name": "Durim Memishi",
  "email": "dm31650@example.com"
}
```

PUT accepts `name`, `email`, or both, and retains fields that are not supplied. IDs and timestamps cannot be overwritten. Empty updates, missing required creation fields, blank names, invalid email addresses, malformed JSON, and invalid IDs return 400. A missing student returns 404 on all three ID routes. Unexpected failures return a generic 500 response.

## Postman evidence

Import `postman/HW1-dm31650.postman_collection.json` into Postman. It includes the default `baseUrl` and captures the created ID as `studentId` automatically.

Run the requests in the collection order: POST, GET all, GET by ID, PUT, GET after update, DELETE, then GET after delete. The final two verification requests demonstrate that changes are persisted. The final GET by ID is expected to return 404. Use a local Postman workspace; no real email account is needed for the sample addresses.

Screenshots are stored in `evidence/` and show each of the five required methods, URLs, status codes, and responses. See `evidence/README.md` for the captured results.

## Automated verification

```sh
npm test
```

Tests start the real Express app on a free local port with an isolated temporary SQLite database. They exercise all five endpoints, query SQLite after PUT, verify deletion, and cover missing IDs, invalid IDs, invalid bodies, malformed JSON, protected fields, and unknown routes. The development database is not modified.

## Dependency note

The dependency versions match the instructor's current starter. At installation, `npm audit` reports two moderate findings for Sequelize and its transitive `uuid` dependency (GHSA-w5hq-g745-h8pq). npm's suggested force fix downgrades Sequelize to a different major version, so it has not been applied. The API uses SQLite integer IDs and does not expose UUID generation.
