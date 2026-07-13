# HRMS Frontend

A React-based frontend for the Human Resource Management System (HRMS). It provides an intuitive interface for managing employees, teams, authentication, and team assignments.

---

## Tech Stack

- React
- React Router DOM
- CSS
- Context API

---

## Features

- User Registration
- User Login
- JWT Authentication
- Dashboard
- Employee Management
  - Add Employee
  - View Employees
  - Update Employee
  - Delete Employee
- Team Management
  - Create Team
  - View Teams
  - Update Team
  - Delete Team
- Assign Employees to Teams
- View Team Members
- View Assigned Members
- Responsive User Interface

---

## Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   ├── employees/
│   │   ├── PageHeader/
│   │   └── teams/
│   │
│   ├── constants/
│   │   └── constants.js
│   │
│   ├── context/
│   │   └── index.jsx
│   │
│   ├── Pages/
│   │   ├── Home/
│   │   ├── Employees/
│   │   ├── Teams/
│   │   └── AssignedMembers/
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── main.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Backend API

The frontend communicates with the HRMS Backend REST API.

Example:

```javascript
const BASE_URL = "https://hrms-backend-9e34.onrender.com";
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Pages

- Login
- Register
- Dashboard
- Employees
- Teams
- Assigned Members

---

## Services

- Authentication API
- Employee API
- Team API
- Team Assignment API

---

## Author

**Yugandhar Boya**
