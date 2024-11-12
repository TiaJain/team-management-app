# Team Management App

## Overview
- This Team Management App is a web-based app that allows users to manage team members by adding, editing, and deleting them. 
- The backend is built with Django and Django REST Framework, while the frontend is a React-based SPA.

---

## Features
- Add, edit, and delete team members.
- Role-based permissions (Admin and Regular).
- Real-time updates through API integration.

---

## Setup + Installation

### 1. Clone my repo
```bash
git clone https://github.com/TiaJain/team-management-app.git
cd team-management
```

### 2. Backend Setup (Django API)
Run these commands in order to navigate to the backend directory, run database migrations, and start the backend server:

```bash
cd team-management
python3 manage.py migrate
python3 manage.py runserver
```

### 3. Frontend Setup (React App)
Run these commands in order to navigate to the frontend directory, install dependencies, and start the frontend server:

```bash
cd team-management-frontend
npm install
npm start
```

At this point, you can access the application hosted at these URLs:
- The frontend will be running on http://localhost:3000.
- The backend API will be available at http://localhost:8000/api/team_members/.

### Manually Using/Testing the Application
Open http://localhost:3000 and try out the following basic functionalities:
1. Add a new team member via the "+" button.
2. Edit an existing team member.
3. Delete a team member (via the red Delete button on the Edit page).
