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
- Role-Based Access Control (RBAC)

## 🏗️ System Architecture

```text
Frontend (React.js)
        │
        ▼
   REST API
        │
        ▼
Backend (Node.js + Express.js)

 📂 Project Structure
## 📂 Project Structure

```text
Inventory-Stock-Management-System/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md


### ** 🚀 Installation & Setup**
```markdown
## 🚀 Installation & Setup
 Clone Repository
### **1. Clone the Repository**

```bash
git clone https://github.com/Noor-3li/Inventory-Stock-Management-System.git
cd Inventory-Stock-Management-System

### ** Backend Dependencies**
```markdown
### **2. Install Backend Dependencies**

```bash
cd backend
npm install

### ** Environment Variables**
```markdown
### **3. Configure Environment Variables**

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### ** Start Backend**
```markdown
### **4. Start the Backend**

```bash
npm start

### ** Frontend Dependencies**
```markdown
### **5. Install Frontend Dependencies**

Open a new terminal:

```bash
cd frontend
npm install

### ** Start Frontend**
```markdown
### **6. Start the Frontend**

```bash
npm run dev

The application will be available at the local URL provided by Vite.


### ** 🔐 Security**
```markdown
## 🔐 Security

- Passwords are hashed before storage.
- JWT is used for authentication.
- Cookies are used for authentication handling.
- Protected routes restrict unauthorized access.
- Role-based authorization controls user permissions.
- Sensitive credentials are stored using environment variables.


