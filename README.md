# Inventory & Stock Management System

A full-stack web application for managing products, categories, and suppliers using the **MERN stack**, with authentication and role-based access control.

## 📌 Overview

The Inventory & Stock Management System provides a centralized platform for managing inventory operations. It uses **Role-Based Access Control (RBAC)** to ensure that each user can access only the features and operations assigned to their role.

## ✨ Key Features

- User authentication and authorization
- Role-based access control
- Product management
- Category management
- Supplier management
- Product CRUD operations
- JWT-based authentication
- Cookie-based authentication
- RESTful API integration
- MongoDB database integration

## 👥 User Roles & Permissions

| Role | Products | Categories | Suppliers |
|---|---|---|---|
| **Manager** | Add, View, Update, Delete | Add, View, Update, Delete | Add, View, Update, Delete |
| **Employee** | Add, View, Update, Delete | No Access | No Access |
| **User** | View Only | No Access | No Access |

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- Axios
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Authentication & Security

- JSON Web Token (JWT)
- Cookies
- bcryptjs
## 🏗️ System Architecture

**React Frontend**  
↓  
**Axios**  
↓  
**Node.js + Express**  
↓  
**Authentication & Authorization**  
↓  
**Mongoose**  
↓  
**MongoDB Atlas**

## 🔄 Application Flow

**User**  
↓  
**Login**  
↓  
**Authentication**  
↓  
**Role Identification**  
↓  
**Manager / Employee / User**

- **Manager:** Full Access
- **Employee:** Product CRUD
- **User:** View Only

## 📂 Project Structure

**Inventory-Stock-Management/**

- `frontend/`
  - `src/`
  - `public/`
  - `package.json`
- `backend/`
  - `models/`
  - `routes/`
  - `controllers/`
  - `middleware/`
  - `server.js`
  - `package.json`
- `README.md`
- `.gitignore`

## ⚙️ Installation & Setup

### 1. Clone the Repository

`git clone https://github.com/Noor-3li/Inventory-Stock-Management-System.git`

`cd Inventory-Stock-Management-System`

### 2. Install Backend Dependencies

`cd backend`

`npm install`

### 3. Configure Environment Variables

Create a `.env` file inside the `backend` directory:

`PORT=5000`

`MONGODB_URI=your_mongodb_connection_string`

`JWT_SECRET=your_jwt_secret`

> **Note:** Do not upload the `.env` file to GitHub.

### 4. Start the Backend

`npm start`

### 5. Install Frontend Dependencies

Open a new terminal:

`cd frontend`

`npm install`

### 6. Start the Frontend

`npm run dev`

The application will be available at the local URL provided by Vite.

## 🔐 Security

- Passwords are hashed before storage.
- JWT is used for authentication.
- Cookies are used for authentication handling.
- Protected routes restrict unauthorized access.
- Role-based authorization controls user permissions.
- Sensitive credentials are stored using environment variables.

- Role-Based Access Control (RBAC)

