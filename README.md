# Subscription Tracker API

A robust RESTful API built with Node.js and Express to help users track their subscriptions and receive automated email reminders before renewals. This project leverages **Upstash Workflow** for scheduling reminders and **Arcjet** for advanced security.

## 🚀 Features

* **User Authentication**: Secure Sign Up, Sign In, and Sign Out using JWT (JSON Web Tokens).
* **Subscription Management**: Create, Read, Update, and Delete (CRUD) subscriptions.
* **Automated Reminders**: Sends email notifications 7, 4, 2, and 1 day(Hz) before a subscription renewal date.
* **Smart Scheduling**: Powered by [Upstash Workflow](https://upstash.com/docs/workflow/getstarted) to handle background reminder tasks.
* **Advanced Security**: Integrated [Arcjet](https://arcjet.com/) middleware for:
 **Bot Detection**: Blocks common bots while allowing search engines.
 **Rate Limiting**: Token bucket algorithm to prevent abuse.
 **Shield**: Protection against common attacks (e.g., SQL injection).
* **Database**: Modeled with Mongoose for MongoDB.
* **Email Services**: Nodemailer integration for sending HTML email notifications.

## 🛠️ Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JSON Web Token (JWT), BcryptJS
* **Security**: Arcjet
* **Workflow Engine**: Upstash Workflow
* **Email**: Nodemailer

## wb Prerequisites

Before getting started, ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v18+ recommended)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)
* An [Upstash](https://upstash.com/) account (for QStash/Workflow)
* An [Arcjet](https://arcjet.com/) account (for security keys)

## 📦 Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/subscription-tracker-app.git
cd subscription-tracker-app

```


2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment Variables**
Create a `.env.development.local` (or `.env.production.local`) file in the root directory and add the following variables based on `config/env.js`:
```env
# Server Configuration
PORT=3000
SERVER_URL="http://localhost:3000"
NODE_ENV="development"

# Database
DB_URI="your_mongodb_connection_string"

# Authentication
JWT_SECRET="your_jwt_super_secret"
JWT_EXPIRES_IN="1d"

# Arcjet Security
ARCJET_ENV="KV" # or "Qb" depending on your setup
ARCJET_KEY="aj_..."

# Upstash Workflow / QStash
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="your_qstash_token"

# Email (Nodemailer)
EMAIL_PASSWORD="your_email_app_password"
# Note: The sender email is currently configured in config/nodemailer.js

```


4. **Run the application**
```bash
# Development mode (uses nodemon)
npm run dev

# Production start
npm start

```



## DG API Endpoints

### Authentication

* `POST /api/v1/auth/sign-up` -Register a new user.
* `POST /api/v1/auth/sign-in` - Login and receive a JWT.
* `POST /api/v1/auth/sign-out` - Clear authentication cookie.

### Users

* `GET /api/v1/users` - Get all users.
* `GET /api/v1/users/:id` - Get specific user details.

### Subscriptions

* `POST /api/v1/subscriptions` - Create a subscription (Triggers reminder workflow).
* `GET /api/v1/subscriptions` - Get all subscriptions.
* `GET /api/v1/subscriptions/:id` - Get specific subscription details.
* `PUT /api/v1/subscriptions/:id` - Update a subscription.
* `DELETE /api/v1/subscriptions/:id` - Delete a subscription.
* `GET /api/v1/subscriptions/user/:id` - Get all subscriptions owned by a specific user.
* `GET /api/v1/subscriptions/upcoming-renewals` - Get upcoming renewals (In progress).

### Workflows

* `POST /api/v1/workflows/subscription/reminder` - Endpoint used by Upstash to trigger reminder logic.

## 📂 Project Structure

```
subscription-tracker-app/
├── config/             # Configuration files (Arcjet, DB, Env, Nodemailer, Upstash)
├── controllers/        # Route logic (Auth, Subscription, User, Workflow)
├── databases/          # Database connection logic
├── middlewares/        # Custom middlewares (Arcjet, Auth, Error handling)
├── models/             # Mongoose schemas (User, Subscription)
├── routes/             # API route definitions
├── utils/              # Utilities (Email templates, Email sender)
├── app.js              # Express app setup and entry point
├── package.json        # Dependencies and scripts
└── README.md           # Project documentation

```

## 🛡️ Security Details

This app utilizes **Arcjet** middleware applied globally in `app.js`.

* **Bot Detection**: configured to `LIVE` mode, allowing search engines but blocking malicious bots.
* **Rate Limiting**: Implements a Token Bucket algorithm (capacity: 10, refill rate: 5/interval).
* **Shield**: Protects against common web attacks.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.
