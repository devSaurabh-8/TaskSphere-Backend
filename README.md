![Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express.js-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)

# ⚙️ TaskSphere Backend

This is the **Node.js + Express + MongoDB** backend for the TaskSphere web application.  
It handles authentication, CRUD operations, and user data management.

---

## 🚀 Live API

🔗 **Base URL:** [https://tasksphere-backend-vz2t.onrender.com](https://tasksphere-backend-vz2t.onrender.com)  
🔗 **Auth Endpoints:** `/api/auth/register`, `/api/auth/login`  
🔗 **User Endpoints:** `/api/users`, `/api/users/:id`

---

## 🛠️ Tech Stack

- 🟢 **Node.js**
- ⚙️ **Express.js**
- 🍃 **MongoDB (Mongoose)**
- 🔐 **bcrypt.js** (Password Hashing)
- 🔑 **jsonwebtoken (JWT Auth)**
- ☁️ **Deployed on Render**

## 📁 Folder Structure
backend/
┣ config/
┃ ┗ db.js
┣ models/
┃ ┗ userModel.js
┣ routes/
┃ ┣ authRoutes.js
┃ ┗ userRoutes.js
┣ controllers/
┃ ┗ userController.js
┣ server.js
┣ .env
┗ package.json

## 📦 Installation

1. Clone repository:
   ```bash
   git clone https://github.com/devSaurabh-8/TaskSphere-Backend.git
   cd TaskSphere-Backend

Install dependencies:
npm install

Run server:
npm start
or for dev:
npm run dev

📡 API Routes
🧍 Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login existing user

👥 Users
Method	Endpoint	Description
GET	/api/users	Get all users
GET	/api/users/:id	Get user by ID
POST	/api/users	Create a new user
PUT	/api/users/:id	Update a user
DELETE	/api/users/:id	Delete a user

🧠 Notes
Backend auto-sleeps on Render Free Plan (takes ~30s to wake).
To keep it active, ping API periodically or upgrade Render plan.
CORS is configured for:
http://localhost:3000
https://task-sphere-frontend-indol.vercel.app

🧑‍💻 Author

👤 Saurabh Pandey
Frontend Developer | React.js | JavaScript
📧 dev.saurabhpandey@gmail.com

## 📁 Folder Structure

