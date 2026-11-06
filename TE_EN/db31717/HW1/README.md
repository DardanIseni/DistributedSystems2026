# HW1 - Student LMS

Student: Dren Bajrami (db31717), TE_EN

Based on `TE_AL/Week4/student-lms`, using Express, Sequelize and SQLite.

## Run

From the repository root:

```bash
cd TE_EN/db31717/HW1/student-lms
npm ci
npm start
```

Tested with Node.js v24.21.0. The API runs at `http://localhost:3000`.
The app creates `students.sqlite` automatically inside `student-lms`.
The database and installed dependencies are not committed.

## Endpoints

| Method | Endpoint | Success |
| --- | --- | --- |
| GET | `/students` | 200, all students |
| GET | `/students/:id` | 200, one student |
| POST | `/student` | 201, created student |
| PUT | `/students/:id` | 200, updated student |
| DELETE | `/students/:id` | 200, deletion message |

For POST and PUT, select Body > raw > JSON in Postman and send both fields:

```json
{
  "name": "Dren Bajrami",
  "email": "db31717@example.com"
}
```

Use the ID returned by POST for GET, PUT and DELETE. For PUT, change the
name or email to verify the update. Missing students return 404. Invalid
IDs, malformed JSON, or missing/empty name and email return 400.

## Verification

All five operations were executed in the Postman desktop lightweight client.
Screenshots are in `evidence/` and embedded in the pull request description.
The screenshots use student ID 3, which was generated during testing.

Additional checks covered invalid input, missing students, SQLite values after
update and delete, and persistence after restarting the server. Test records
were removed after verification.

`npm audit` reports two moderate findings in Sequelize's dependency chain
(Sequelize and uuid). No forced downgrade was applied to the professor's stack.
