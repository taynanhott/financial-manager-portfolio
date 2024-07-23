# Financial Manager

## Project Overview

Financial Manager is a comprehensive financial management system developed using Next.js, TypeScript, Tailwind CSS, Prisma, Node.js, and ApexCharts. The backend is powered by Prisma, which defines models for creating database tables.

This project is part of my portfolio, inspired by an Excel spreadsheet used to track finances. The system includes:

- **Payment Registration**: All outgoing transactions.
- **Income Registration**: All incoming transactions.
- **Category and Subcategory Management**: Classification of transactions.

## Key Features

### Payment Management

- **Description**: Brief details about the payment.
- **Date**: Date of the transaction.
- **Payment Status**: Indicates whether the payment is completed or pending.
- **Amount**: Value of the payment.
- **Category**: Indicates the type of payment (e.g., debit, credit).
- **Subcategory**: Provides a more detailed purpose of the payment (e.g., delivery, household bills, leisure, shopping).

### Income Management

- **Description**: Brief details about the income.
- **Expected Payment Date**: Date when the income is expected.
- **Payment Status**: Indicates whether the income has been received or is pending.
- **Amount**: Value of the income.

### Category Management

- **Description**: Indicates the type of payment method (e.g., debit, credit).

### Subcategory Management

- **Description**: Provides the purpose of the payment (e.g., delivery, household bills, leisure, shopping).

### Reporting and Dashboard

The system includes a comprehensive reporting and dashboard feature that presents all financial data in an aggregated view and in isolated modules for detailed analysis.

### Authentication

Users can log in using email and password or via Google account integration through Firebase.

## Technologies Used

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Prisma**
- **Node.js**
- **ApexCharts**
- **Firebase** (for authentication)

## Getting Started

To get started with the Financial Manager project, follow these steps:

1. **Clone the repository**:
   - git clone https://github.com/taynanhott/financial-manager-portfolio.git
   - cd financial-manager
   - npm install
2. **Connect your database**:
   - Create a .env file in the root directory.
   - Add your PostgreSQL connection.

   POSTGRES_URL=your_postgres_connection_string
   POSTGRES_URL_NON_POOLING=your_postgres_connection_string
   POSTGRES_URL_NO_SSL=your_postgres_connection_string_no_ssl
   POSTGRES_PRISMA_URL=your_postgres_prisma_connection_string
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_HOST=your_postgres_host
   POSTGRES_DATABASE=your_postgres_database

   - npx prisma migrate dev
3. **Connect your firebase**:
   - Add your firebase connection in .env.

   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   NEXT_PUBLIC_AUTH_SECRET=your_auth_secret
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
4. **Run project**:
   - npm run dev
