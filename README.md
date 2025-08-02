# 🛒 E-Commerce Backend API

This is a backend API for a simple eCommerce application built with **Node.js**, **Express**, and **MongoDB**. It handles product management, secure authentication, and payment integration (in progress). The project is part of my backend development learning journey.

---

## 🔧 Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** Firebase Auth *(JWT fallback in progress)*
- **Payments:** Paystack *(integration in progress)*
- **Testing:** Postman (manual), Cypress *(planned)*
- **Deployment:** Render *(planned)*

---

## 📁 Folder Structure
📦 ecommerce-backend
┣ 📂 controllers
┣ 📂 models
┣ 📂 routes
┣ 📂 middleware
┣ 📂 config
┣ 📜 .env
┣ 📜 server.js
┣ 📜 package.json


---

## 📦 Core Features

### ✅ Product Management

- `GET /api/products` – Get all products  
- `GET /api/products/:id` – Get single product  
- `POST /api/products` – Create new product *(admin only)*  
- `PUT /api/products/:id` – Update product *(admin only)*  
- `DELETE /api/products/:id` – Delete product *(admin only)*

---

### 🔐 Authentication & User Features

- `POST /api/auth/signup` – Register a new user  
- `POST /api/auth/login` – Login user  
- `POST /api/auth/forgot-password` – Send password reset link to user’s email  
- `POST /api/auth/reset-password` – Reset password using token  
- `PATCH /api/auth/update-password` – Update password when logged in *(protected)*  
- `GET /api/auth/me` – Get current user profile *(protected)*

> Authentication is handled via **Firebase Auth**. JWT fallback and admin role management are in progress.

---

### 💰 Payment Integration *(Coming Soon)*

- Integration with **Paystack** to process secure online payments

---

## 🧪 API Testing

- All endpoints tested with **Postman**
- Example test cases include:
  - Required field validation
  - Invalid route handling
  - Token-based auth protection
  - Password reset and update flows
- Automated testing setup with **Cypress** is in the roadmap

---

## ⚙️ Getting Started

### 📌 Prerequisites

- Node.js installed
- MongoDB connection (local or MongoDB Atlas)
- Firebase project & API key (for auth)
- Paystack test keys (optional)

### 🚀 Installation

```bash
git clone https://github.com/Liciacodes/ecommerce-backend.git
cd ecommerce-backend
npm install

🛠️ Environment Variables
Create a .env file in the root and add:
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_API_KEY=your_firebase_key
PAYSTACK_SECRET_KEY=your_paystack_key
JWT_SECRET=your_jwt_secret

npm run dev

