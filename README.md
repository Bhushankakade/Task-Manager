# Task Manager App

## Requirements

- Node.js v18+
- MongoDB running locally **or** a MongoDB Atlas URI

---

## Getting Started

### Backend

```bash
cd backend
npm install
# Create .env file (see Step 2)
node server.js
```

Runs at: `http://localhost:3000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: `http://localhost:5173`

---

## Quick Test

1. Open `http://localhost:5173`
2. Sign up → Login → Add tasks → Filter → Mark complete → Delete

---

## API Documentation

**Base URL:** `http://localhost:3000/api/v1`

---

### Auth Endpoints

> No token required

#### `POST /auth/signup`

```json
// Request Body
{ "name": "Bhushan", "email": "b@mail.com", "password": "123456" }

// Response
{ "token": "...", "user": { "id": "...", "name": "Bhushan", "email": "b@mail.com" } }
```

#### `POST /auth/login`

```json
// Request Body
{ "email": "b@mail.com", "password": "123456" }

// Response
{ "token": "...", "user": { "id": "...", "name": "Bhushan", "email": "b@mail.com" } }
```

---

### Task Endpoints

> Requires header: `Authorization: Bearer <token>`

#### `POST /tasks`

```json
// Request Body
{ "title": "Buy groceries", "description": "Milk and eggs" }

// Response
// Created task object
```

#### `GET /tasks`

```
// Query Params
?status=pending&page=1&limit=5

// Response
{ "tasks": [...], "total": 20, "page": 1 }
```

#### `PATCH /tasks/:id`

```json
// No body needed

// Response
// Updated task object with status: "completed"
```

#### `DELETE /tasks/:id`

```json
// Response
{ "message": "Task deleted" }
```
