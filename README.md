# Digital Bank API

A RESTful API for a digital banking application that calls NibssbyPhoenix to create accounts and perform transactions.

## Features

- User authentication and account management
- Fund transfers
- KYC (Know Your Customer) verification
- NIBSS integration for bank transfers
- Rate limiting and security middleware
- Transaction management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (or configured database)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with required environment variables

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── config/           # Database and configuration files
├── controllers/      # Request handlers
├── middleware/       # Custom middleware (auth, rate limiting)
├── models/          # Database schemas
├── routes/          # API route definitions
├── services/        # Business logic and external integrations
├── utils/           # Utility functions
├── app.js           # Express app setup
├── server.js        # Server entry point
└── package.json     # Dependencies and scripts
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Accounts
- `GET /account/` - Get account details
- `POST /account/` - Create account

### Transfers
- `POST /transfer/` - Initiate transfer

### Onboarding
- `POST /onboarding/` - User onboarding

## Environment Variables

Create a `.env` file with the following variables:

```
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/newbb
JWT_SECRET=your_secret_key
```

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server

## Security Features

- JWT authentication
- Rate limiting
- Input validation
- CORS protection

## License

ISC
