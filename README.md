
# 🧠 Task API

A simple and efficient **Task Management REST API** built with **Node.js** and **Express.js**. This API lets you create, update, delete, and fetch tasks — making it ideal for task-based applications or as a starting point for full-stack projects.

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** with Mongoose
- **RESTful API design**
- **Postman** (for testing)
- **dotenv** (for environment management)

---

## 📦 Features

- 🔐 User Authentication (optional if added)
- 📝 Create, Update, Delete Tasks
- 📋 Fetch Tasks by ID or all
- 🧹 Clean and Modular Code
- 📦 MongoDB for persistent storage

---

## 📊 Architecture Diagram

Here's a simple block diagram showing how the system works:

```
┌────────────┐     HTTP      ┌──────────────┐     MongoDB     ┌────────────┐
│  Client    ├──────────────▶│  Express.js  ├────────────────▶│  Database  │
│ (Postman)  │  (CRUD APIs)  │   (Router)   │     Mongoose    │  (Tasks)   │
└────────────┘               └──────────────┘                 └────────────┘
```


## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/chirag21r/Task-api.git
cd Task-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the Server

```bash
node server.js
```

Server will start at `http://localhost:5000`

---

## 📬 API Endpoints

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | `/api/tasks`       | Get all tasks         |
| GET    | `/api/tasks/:id`   | Get task by ID        |
| POST   | `/api/tasks`       | Create a new task     |
| PUT    | `/api/tasks/:id`   | Update task by ID     |
| DELETE | `/api/tasks/:id`   | Delete task by ID     |
| GET    | `/api/users`       | Get all users         |
| GET    | `/api/users/:id`   | Get users by ID       |
| POST   | `/api/users`       | Create a new user     |
| PUT    | `/api/users/:id`   | Update user by ID     |
| DELETE | `/api/users/:id`   | Delete user by ID     |
| GET   | `/api/users/:id/tasks` | Get all tasks of user by ID|



---

## 🔁 Sample JSON Task Object

```json
{
  "title": "Finish README",
  "description": "Write a professional readme file",
  "completed": false
}
```

---

## 🧪 Testing With Postman

1. Run the server.
2. Open Postman.
3. Send requests to: `http://localhost:5000/api/tasks`

---



