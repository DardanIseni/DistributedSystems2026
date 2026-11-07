# Postman evidence - Durim Memishi (dm31650)

These are unedited screenshots captured from the official Postman desktop application while sending requests to this project's running API at `http://localhost:3005`.

The requests were run in the collection order below. Each screenshot shows the HTTP method, full URL, response status, response JSON, and **2/2** passing Postman tests.

1. **POST /student - 201 Created**: created Durim Memishi with ID 1.  
   ![POST create](01-post-create.png)
2. **GET /students - 200 OK**: returned the new student in the list.  
   ![GET all](02-get-all.png)
3. **GET /students/1 - 200 OK**: returned the saved student.  
   ![GET by ID](03-get-by-id.png)
4. **PUT /students/1 - 200 OK**: changed the name to `Durim Memishi (Updated)` and email to `dm31650.updated@example.com`.  
   ![PUT update](04-put-update.png)
5. **GET /students/1 - 200 OK**: independently retrieved the updated values.  
   ![GET after update](05-get-after-update.png)
6. **DELETE /students/1 - 200 OK**: confirmed successful removal of ID 1.  
   ![DELETE](06-delete.png)
7. **GET /students/1 - 404 Not Found**: confirmed the deleted student no longer exists. This is the expected successful outcome of the verification request.  
   ![GET after delete](07-get-after-delete.png)

## Direct database verification

In addition to the Postman verification requests, the live `students.sqlite` file was opened through a separate SQLite connection:

- After PUT, `SELECT id, name, email FROM Students` returned `(1, 'Durim Memishi (Updated)', 'dm31650.updated@example.com')`.
- After DELETE, `SELECT COUNT(*) FROM Students` returned `0`.

Automated tests also verify update and deletion persistence in an isolated SQLite file. Run `npm test` from the project directory; the recorded run passed all 13 tests with zero failures.

The sample `example.com` addresses are test data. Generated databases and installed dependencies are excluded from the commit.
