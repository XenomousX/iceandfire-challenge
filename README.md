## 🏗️ Architecture

This project follows a full-stack architecture with clear separation of concerns:

- **Frontend**: Angular application with NgRx state management located in the `frontend/` directory
- **Backend**: Node.js/TypeScript API server with authentication located in the `backend/` directory

## ✨ Features

- **Responsive Design**: Mobile-first approach with desktop compatibility
- **User Authentication**: Registration and login functionality with JWT tokens
- **HTTP Interceptors**: Automatic token attachment for protected routes
- **Route Guards**: Protected and unprotected route management
- **Item Management**: Browse and view detailed information
- **Favorites System**: Save and manage favorite items
- **State Management**: NgRx for predictable state management
- **Real-time Search**: Quick filtering on the list page# Game of Thrones Challenge Website

A full-stack web application built as an assignment project, featuring a Game of Thrones themed interface with comprehensive functionality including list management, favorites, search, and user authentication.

## 📋 Assignment Requirements

This project fulfills the following assignment requirements:

### ✅ Core Requirements (Completed)
- **Mobile-First Responsive Design**: Application designed with mobile-first approach and responsive for desktop
- **List Page**: Displays items from API with search functionality
- **Detail Page**: Shows detailed information for selected items
- **Favorites Page**: Users can view and manage favorite items
- **Add/Remove Favorites**: Full functionality to add and remove items from favorites
- **Search Bar**: Quick filtering capability on the List page
- **NgRx State Management**: Implemented for application state management
- **GitHub Hosting**: Project hosted on GitHub with repository access
- **README Documentation**: Complete technical information and installation instructions

### ✅ Bonus Features (Completed)
- **Authentication System**: User registration and login with Node.js backend
- **JWT Token Management**: JWT tokens for secure authentication with HTTP interceptors
- **Route Protection**: Implemented protected and unprotected routes using Angular guards and interceptors
- **In-Memory User Storage**: Users stored in memory (no database required)
- **Landing Page**: Dedicated landing page for the application
- **End-to-End Testing**: E2E testing implementation

### 🔄 Areas for Improvement
- **UI/UX Design**: Design could be enhanced with better visual aesthetics and user experience patterns
- **E2E Test Coverage**: Test cases could be more comprehensive and precise with additional scenarios
- **API Security**: Adding middleware for enhanced security and API endpoint obfuscation
- **Route Security**: Implementing additional layers of route protection and API location hiding
- **Deployment Ready**: Implementing for deployment ready application, still require environment file, etc to proper setup

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:
- Node.js (version 14 or higher)
- npm (Node Package Manager)
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Setup

**⚠️ Important: The backend must be started before running the frontend application.**

#### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend/
npm install
```

Start the backend server:

```bash
npx ts-node ./src/app.ts
```

The backend server will start running on the default port.

**🗄️ Data Storage Note**: This backend uses an in-memory service and does not connect to a database. All data will be wiped when the server is shut down.

#### 2. Frontend Setup

**Make sure the backend server is running first!**

Navigate to the frontend directory and install dependencies:

```bash
cd frontend/
npm install
```

Start the Angular development server:

```bash
ng serve
```

The frontend application will be available at `http://localhost:4200`

## 🧪 Testing

### End-to-End Testing

To run the end-to-end tests:

**Important**: Ensure the backend server is running before executing tests.

```bash
# First, start the backend (in a separate terminal)
cd backend/
npx ts-node ./src/app.ts

# Then run the e2e tests
cd frontend/
ng e2e
```

Make sure both the backend and frontend servers are running before executing the e2e tests.

## 📁 Project Structure

```
project-root/
├── backend/          # Node.js/TypeScript backend
│   ├── src/
│   │   └── app.ts    # Main server file
│   ├── package.json
│   └── ...
├── frontend/         # Angular frontend application
│   ├── src/
│   ├── e2e/          # End-to-end tests
│   ├── package.json
│   └── ...
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- Angular
- NgRx (State Management)
- TypeScript
- HTML/CSS
- JWT Token Management
- HTTP Interceptors for Authentication
- Angular Route Guards
- Responsive Design (Mobile-First)

### Backend
- Node.js
- TypeScript
- Express.js
- JWT Authentication System
- HTTP Interceptors for route protection
- **In-memory data storage** (no database connection)

### Testing
- Angular E2E testing framework

## 📝 Development Notes

This project was created as an assignment to demonstrate full-stack development capabilities. It showcases:
- Mobile-first responsive web design
- Angular with NgRx state management
- RESTful API development with authentication  
- End-to-end testing practices
- BDD (Behavior-Driven Development) approach

**Assignment Context**: This application fulfills all core requirements and most bonus features of the given assignment, with noted areas for future improvement in UI/UX design and test coverage.

## 📄 License

This project is for educational/testing purposes.

## 🎯 Purpose

Created as an assignment project to demonstrate full-stack web development skills including:
- Angular frontend development with NgRx
- Node.js backend with authentication
- Responsive design principles
- State management patterns
- End-to-end testing implementation