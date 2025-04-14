# MERN Stack Todo Application with MongoDB

A simple todo application built with:
- **M**ongoDB (Database)
- **E**xpress.js (Backend Framework)
- **R**eact (Frontend Framework)
- **N**ode.js (Runtime Environment)

## Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas cluster)

## Installation

1. Clone the repository
2. Install dependencies for both backend and frontend:
```bash
cd MERN_TODO_APP/backend && npm install
cd ../client && npm install
```

## Configuration

### Backend
1. Create a `.env` file in the backend directory with:
```env
MONGODB_URI=mongodb://localhost:27017/todoapp
PORT=3000

Or simply mongo connection string
```

### Frontend
1. The API base URL is configured in the `package.json` proxy field:
```json
"proxy": "http://localhost:3001"
```

## Running the Application

### Start MongoDB
```bash
sudo systemctl start mongod  # Linux
mongod                      # Mac/Windows
```

### Start Backend Server
```bash
cd backend
node server.js
```

### Start Frontend Development Server
```bash
cd client
npm start
```

## Accessing the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:3000/api/tasks

## Key Features
- Create, read, update, and delete tasks
- Real-time updates
- RESTful API backend
- MongoDB data persistence

## Project Structure
``` yaml
mern-todo-app/
├── backend/               # Node.js/Express server
│   ├── models/            # MongoDB models (e.g., Task.js for task schema)
│   ├── routes/            # API routes (e.g., tasks.js for task-related endpoints)
│   ├── middleware/        # Middleware for request handling (e.g., authentication, logging)
│   └── server.js          # Main server file to start the Express app
├── client/                # React application
│   ├── src/               # Source code for the React app
│   │   ├── components/    # UI components (e.g., TaskManager.js)
│   │   ├── assets/        # Static assets like images, stylesheets
│   │   └── index.js       # Application entry point
│   ├── public/            # Public assets like index.html
│   ├── package.json       # Frontend dependencies and scripts
│   └── README.md          # Frontend-specific documentation
└── README.md              # Main project documentation
```

## API Endpoints

### GET All Tasks
```bash
curl -X GET http://localhost:3000/api/tasks
```

### POST Create a Task
```bash
curl -X POST http://localhost:3000/api/tasks \
-H "Content-Type: application/json" \
-d '{"title": "New Task", "dueDate": "2025-04-15T10:00:00Z"}'
```

### DELETE a Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/<task_id>
```

### Using Postman
1. Import the following endpoints into Postman:
   - **GET**: `http://localhost:3000/api/tasks`
   - **POST**: `http://localhost:3000/api/tasks`
   - **DELETE**: `http://localhost:3000/api/tasks/<task_id>`
2. Set headers for POST requests:
   - `Content-Type: application/json`
3. Use the body tab in Postman to send JSON data for POST requests.

## Troubleshooting
- If MongoDB connection fails, verify:
  - MongoDB service is running
  - Connection URI in `.env` is correct
  - No firewall blocking port 27017

- For React issues:
  - Check console errors in browser
  - Verify API responses in Network tab
  - Run `npm start` to debug

## Application Architecture

The MERN Stack Todo Application follows a modular architecture with clear separation of concerns between the frontend and backend. Below is an overview of the architecture:

### Architecture Overview
1. **Frontend (React)**:
   - Handles user interactions and displays data.
   - Communicates with the backend via RESTful APIs.
   - Built using React components and hooks.

2. **Backend (Node.js + Express)**:
   - Provides RESTful APIs for CRUD operations.
   - Handles business logic and interacts with the database.
   - Uses middleware for request validation and error handling.

3. **Database (MongoDB)**:
   - Stores tasks and their metadata (e.g., title, due date, completion status).
   - Provides a flexible schema for data storage.

### Flow Diagram
Below is a simplified flow diagram of the application:

```
+-------------+        HTTP Requests         +-----------------+        Database Queries        +-------------+
|             | --------------------------> |                 | ----------------------------> |             |
|   Frontend  |                             |     Backend     |                                |   MongoDB    |
|   (React)   | <-------------------------- | (Node.js + API) | <---------------------------- | (Database)   |
|             |        JSON Responses       |                 |        Query Results          |             |
+-------------+                             +-----------------+                                +-------------+
```

### Generating a Visual Diagram
To create a visual diagram, you can use tools like [Mermaid](https://mermaid-js.github.io/mermaid/) or [Draw.io](https://app.diagrams.net/). Below is a Mermaid diagram code snippet:

```mermaid
graph TD
    A[Frontend (React)] -->|HTTP Requests| B[Backend (Node.js + Express)]
    B -->|Database Queries| C[MongoDB]
    C -->|Query Results| B
    B -->|JSON Responses| A
```

To render this diagram:
1. Copy the code above.
2. Paste it into a Markdown file or a tool that supports Mermaid diagrams (e.g., GitHub, VS Code with Mermaid extension).

This architecture ensures scalability, maintainability, and a clear separation of concerns.

## Note
- A single backend can serve both React and Angular frontends. There's no need to maintain two separate backends for different frontends.
- like run backend on 3000
- Angular front end on 4200
- React Frontend on 3001
