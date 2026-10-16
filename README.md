 ##### School Management System API

A backend REST API built with NestJS, TypeScript, and PostgreSQL for managing school operations, including students, teachers, classes, subjects, enrollment, grades, and attendance.#

The application includes user authentication, JWT-based authorization, role-based access control, request validation, pagination, search, filtering, logging, and API documentation.

# Features

1. ## User Management

- Manage user accounts.
- Support student, teacher, and administrator roles.
- Link user accounts to student or teacher profiles.

2. ## Student Management

- Create, retrieve, update, and delete student records.
- Retrieve students by ID.
- Search students by name.
- Filter students by class.
- Paginate student listings.

3. ## Teacher Management

- Create and retrieve teacher profiles.
- Link teacher profiles to user accounts.
- Associate teachers with their subjects.

4. ## Authentication

- Register new accounts.
- Log in with email and password.
- Hash passwords using bcrypt.
- Generate JWT access tokens.
- Retrieve the authenticated user's profile.

5. ## Authorization and Security

- Protect routes with JWT authentication guards.
- Restrict access according to user roles.
- Validate incoming request data using DTOs.
- Apply global request validation.
- Store secrets in environment variables.

6. ## School Operations

- Classes: Create and retrieve school classes.
- Subjects: Create and retrieve subjects.
- Enrollment: Enroll students in subjects.
- Grades: Record and retrieve student scores.


7. ## Professional Features

- Centralized exception handling through NestJS exceptions.
- Request logging.
- Pagination, search, and filtering.
- Swagger API documentation.
- Automated unit and end-to-end testing.

## Technology Stack

- Framework: NestJS
- Language: TypeScript
- Database: PostgreSQL
- ORM: TypeORM
- Authentication: JWT and Passport
- Password Hashing: bcrypt
- Validation: class-validator and class-transformer
- Configuration: @nestjs/config
- API Documentation: Swagger 
- Testing: Jest and Supertest


## Prerequisites

Before running the application, install:

- Node.js (a version supported by your NestJS project)
- npm
- PostgreSQL
- Git

Installation

1. # Clone the repository

git clone <https://github.com/emynogithub/SCHOOL-MANAGEMENT-API>
cd < The project folder>

Replace the placeholders with your actual repository URL and project folder.

2. # Install dependencies

npm install

3. # Configure environment variables

Create a ".env" file in the project root:

DATABASE_HOST=localhost
DATABASE_PORT= 5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=school_db

JWT_SECRET= SECRET_KEYZ
JWT_EXPIRES_IN= few_Hrs

PORT=3000

Replace the database credentials with your actual PostgreSQL details. Use a strong, randomly generated JWT secret.

Security: Never commit ".env" to version control. Keep ".env" in ".gitignore" and provide a sanitized ".env.example" for other developers.

4. # #Create the database

Create a PostgreSQL database named "school_db", or change "DATABASE_NAME" to match your database.

Ensure that the configured PostgreSQL user has the required database permissions.

5. # Run database migrations

If you have configured TypeORM migrations, run the migration command appropriate to your project before starting the application.

For production, use migrations rather than "synchronize: true".

Running the Application

Development

npm run start:dev

Standard start


Production

npm run build
npm run start:prod

By default, the application is expected to run at:

"http://localhost:3000"

API Documentation

Swagger provides an interactive interface for exploring and testing the API.

After starting the application, visit:

"http://localhost:3000/api"

If Swagger is enabled at the "/api" path in your application, you can use it to inspect endpoints, view request schemas, and test authenticated routes.

For protected endpoints, obtain a JWT through the login endpoint and authorize requests using the Bearer token.

API Routes

The following is an overview of the intended API structure. Confirm the exact routes and HTTP methods in your controllers and Swagger documentation.

Resource| Typical endpoints| Purpose
Authentication| "/auth/register", "/auth/login", "/auth/me"| Account registration, login, and current user
Students| "/students"| Student management
Teachers| "/teachers"| Teacher management
Classes| "/classes"| School class management
Subjects| "/subjects"| Subject management
Enrollment| "/enrollments"| Student subject enrollment
Grades| "/grades"| Student grades


The exact CRUD routes depend on the controllers and methods implemented in the project.

Authentication

Register

Send a "POST" request to:

"/auth/register"

Example request body:

{
  "name": "Godwin Andrew",
  "email": "AD@example.com",
  "password": "Password12345"
  "role": 'student'
}

Public registration should assign the student role by default. Administrator privileges should be granted only through a secure administrative process.

Login

Send a "POST" request to:

"/auth/login"

Example request body:

{
  "email": "ADexample.com",
  "password": "Password123"
}

Use the returned access token to authenticate protected requests:

Authorization: Bearer YOUR_ACCESS_TOKEN

Pagination and Search

The student listing endpoint supports pagination, name search, and class filtering if these options are enabled in the controller.

Example:

GET /students?page=1&limit=10&search=John

A paginated response may contain:

{
  "data": [],
  "total": 0,
  "page": 1,
  "limit": 10,
  "totalPages": 0
}

The response structure depends on the implementation of the service.

Testing

Run unit tests:

npm run test

Run tests in watch mode:



The following is a representative structure. Your actual filenames may differ.

src/
├── auth/
│ ├── decorators/
│ ├── guards/
│ ├── strategies/
│ ├── dto/
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ └── auth.module.ts
├── user/
│ ├── entities/
│ ├── user.controller.ts
│ ├── user.service.ts
│ └── user.module.ts
├── student/
│ ├── dto/
│ ├── entities/
│ ├── student.controller.ts
│ ├── student.service.ts
│ ├── student.service.spec.ts
│ └── student.module.ts
├── teacher/
├── classes/
├── subjects/
├── enrollment/
├── grades/
├── utils/
├── app.module.ts
└── main.ts

test/
└── app.e2e-spec.ts

.env
.env.example
.gitignore
package.json
README.md

Production Considerations

Before deploying the application:

- Use a strong JWT secret and store it securely.
- Use HTTPS in production.
- Use TypeORM migrations instead of automatic schema synchronization.
- Configure database backups.
- Verify authorization on every protected endpoint.
- Ensure users cannot assign themselves administrator privileges.
- Configure rate limits appropriate to the application's traffic.
- Test error handling and authentication failures.
- Review database relationships and data integrity.
- Run automated tests before each release.

# Future Improvements

Potential extensions include:

- School fees and payment tracking.
- Real world chatting feature (customer care)
- Timetables and class scheduling.
- Examination management and report cards.
- Parent or guardian accounts.
- Notifications and announcements.
- File uploads for student documents.
- Audit logs for administrative actions.
- Automated deployment and continuous integration.





