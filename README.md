# Student Directory - Docker Web Dashboard

A full-stack web dashboard for managing student records, containerized with Docker.

## 🛠️ Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Frontend | React + CSS-in-JS    |
| Backend  | Node.js + Express    |
| Database | PostgreSQL 15        |
| Docker   | Docker + Compose     |

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running

### Run the project

```bash
# Clone / navigate to the project
cd CSA_microproject

# Build and start all containers
docker-compose up --build

# Or run in background (detached mode)
docker-compose up --build -d
```

Then open your browser:
- **Frontend Dashboard**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### Stop the project
```bash
docker-compose down

# To also remove the database volume (fresh start)
docker-compose down -v
```

## 📁 Project Structure

```
CSA_microproject/
├── docker-compose.yml
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/index.html
│   └── src/
│       ├── index.js
│       ├── App.jsx
│       ├── api/students.js
│       └── components/
│           ├── Navbar.jsx
│           ├── Dashboard.jsx
│           ├── StudentList.jsx
│           ├── StudentForm.jsx
│           └── DeleteModal.jsx
└── backend/
    ├── Dockerfile
    ├── package.json
    ├── server.js
    ├── routes/students.js
    └── db/
        ├── index.js
        └── init.sql
```

## 🔌 API Endpoints

| Method | Endpoint                    | Description          |
|--------|-----------------------------|----------------------|
| GET    | /api/students               | List all students    |
| GET    | /api/students/:id           | Get one student      |
| POST   | /api/students               | Create student       |
| PUT    | /api/students/:id           | Update student       |
| DELETE | /api/students/:id           | Delete student       |
| GET    | /api/students/stats/summary | Dashboard stats      |

### Query Parameters (GET /api/students)
- `search` — filter by name or email
- `department` — filter by department name
- `year` — filter by year (1–4)

## 🐳 Docker Services

| Service  | Container         | Port |
|----------|-------------------|------|
| Frontend | student_frontend  | 3000 |
| Backend  | student_backend   | 5000 |
| Database | student_db        | 5432 |

