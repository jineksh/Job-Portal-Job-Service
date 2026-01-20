# Job Portal Job Service

A Node.js backend service for managing jobs, companies, and applications in a job portal application. This service handles job postings, company management, application submissions, and email notifications using background queues.

## Features

- Job management (CRUD operations)
- Company management
- Application handling
- File uploads (using Multer)
- Email notifications (via Nodemailer and BullMQ queues)
- Authentication middleware
- Error handling
- API versioning (v1)

## Technologies Used

- **Node.js** with **Express.js** for the web framework
- **Sequelize** ORM with **MySQL2** for database management
- **Redis** for caching and queue management
- **BullMQ** for background job processing
- **JWT** for authentication
- **Multer** for file uploads
- **Nodemailer** for email sending
- **CORS** for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- Redis server
- Gmail account (for email notifications)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd job-portal-job-service
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   JWT_KEY=your_jwt_secret_key
   REDIS_HOST=localhost
   REDIS_PORT=6379
   GMAIL_USER=your_gmail@gmail.com
   GMAIL_PASS=your_gmail_app_password
   DATABASE_URL=mysql://username:password@localhost:3306/job_portal_db
   ```

4. Set up the database:
   - Create a MySQL database named `job_portal_db`
   - Run migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```

5. Start the service:
   ```bash
   npm start
   ```

The service will run on `http://localhost:3000` by default.

## API Endpoints

### Base URL: `/api/v1`

- **Test Routes**: `/test`
- **Company Routes**: `/company`
- **Job Routes**: `/job`
- **Application Routes**: `/application`

### Example Endpoints

- `GET /api/v1/job` - Get all jobs
- `POST /api/v1/job` - Create a new job
- `GET /api/v1/company` - Get all companies
- `POST /api/v1/application` - Submit an application

## Project Structure

```
job-portal-job-service/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── src/
    ├── index.js                          # Main application entry point
    ├── apis/
    │   ├── uploadServer.js               # File upload server logic
    │   └── userServer.js                 # User-related server logic
    ├── config/
    │   ├── config.json                   # Sequelize configuration
    │   ├── mail.js                       # Email configuration
    │   ├── redis.js                      # Redis configuration
    │   └── server.js                     # Server configuration (PORT, JWT, etc.)
    ├── controller/
    │   ├── application.js                # Application controller
    │   ├── companyController.js          # Company controller
    │   └── jobController.js              # Job controller
    ├── errors/
    │   ├── index.js                      # Error definitions
    │   └── queueError.js                 # Queue-related errors
    ├── middleware/
    │   ├── authentic.js                  # Authentication middleware
    │   ├── errorHandler.js               # Error handling middleware
    │   └── multer.js                     # File upload middleware
    ├── migrations/
    │   ├── 20250101000001-create-company.js  # Company table migration
    │   ├── 20250101000002-create-job.js      # Job table migration
    │   └── 20250101000003-create-application.js  # Application table migration
    ├── models/
    │   ├── index.js                      # Sequelize models index
    │   ├── application.js                # Application model
    │   ├── company.js                    # Company model
    │   └── job.js                        # Job model
    ├── producers/
    │   └── mail.js                       # Email job producer
    ├── queues/
    │   └── mail.js                       # Email queue configuration
    ├── repository/
    │   ├── application.js                # Application repository
    │   ├── companyRepository.js          # Company repository
    │   └── jobRepository.js              # Job repository
    ├── routes/
    │   ├── index.js                      # Main routes
    │   └── v1/
    │       ├── index.js                  # V1 routes index
    │       ├── applicationRoutes/
    │       │   └── index.js              # Application routes
    │       ├── companyRoutes/
    │       │   └── index.js              # Company routes
    │       ├── jobRoutes/
    │       │   └── index.js              # Job routes
    │       └── testRoutes/
    │           └── index.js              # Test routes
    ├── service/
    │   ├── application.js                # Application service
    │   ├── companyService.js             # Company service
    │   └── jobService.js                 # Job service
    ├── utils/
    │   ├── apiResponse.js                # API response utilities
    │   ├── datUri.js                     # Data URI utilities
    │   ├── mail.js                       # Email utilities
    │   └── updateApplicationMailTemplete.js  # Email template for application updates
    └── workers/
        └── mail.js                       # Email worker for processing queues
```

## Usage

1. Start the server with `npm start`.
2. The service exposes a health check endpoint at `GET /home`.
3. Use API endpoints under `/api/v1` for job portal operations.
4. Email notifications are handled asynchronously via Redis queues.

## Scripts

- `npm start`: Start the server with nodemon for development.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## License

This project is licensed under the ISC License.
