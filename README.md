# 🏫 XYZ School Management System

A premium, modern, and feature-rich Web Portal for school management. Built with **React 19**, **Vite**, and **Tailwind CSS**, this system features a responsive UI with dynamic animations, rich analytics, and role-based portal dashboards (Admin, Teacher, Staff, Student) to orchestrate academic operations, personnel, finance, library, and communication.

---

## ✨ Features

### 🌐 Public Website
* **Landing & Admissions Pages:** Engaging home page, online inquiry, and admission registration forms.
* **Information Portals:** Academic calendar, facilities, mandatory disclosures, public gallery, and contact portal.
* **SEO Optimized:** Integrates `react-helmet-async` for optimized metadata across pages.

### 🔑 Authentication & Security
* Secure role-based login and registration (Student, Teacher, Staff, Admin).
* JWT-based authentication via Axios interceptors, saving session credentials securely.

### 🛡️ Admin Portal (Comprehensive Control)
* **Dashboard Overview:** High-level statistics on enrollment, active staff, library, and financial status.
* **Personnel Directory:** Management interfaces for Students, Teachers, and Staff.
* **Fees & Finance:** Track collections, manage invoices, record expenses, and check finance reports.
* **Class & Section Setup:** Structure classes, sections, timetables, and academic settings.
* **Facilities & Inventory:** Library operations (circulation, book issuance, inventory), reception tracking, and calendar schedules.
* **Announcements:** Post notices and broadcast alerts to specific portals.

### 🧑‍🏫 Teacher Portal
* **Dashboard:** At-a-glance timetable, active assignments, and recent notifications.
* **Class Management:** Take attendance, view student rosters, and manage student lists.
* **Academic Assessment:** Schedule exams, input student marks/results, and assign coursework.

### 💼 Staff Portal
* **Dashboard & Profile:** Professional staff dashboard showing calendar events and salary overviews.
* **Operational Tasks:** Log attendance, request leave, manage staff documents, and check notice boards.
* **Communication:** Portal messaging system to collaborate with other administrators and teachers.

### 🎓 Student Portal
* **Dashboard:** Personal calendar, due assignments, and academic timetables.
* **Learning Tracker:** View classes, track attendance, and view exam results/grades.
* **Fees Overview:** Keep track of fee structures, paid invoices, and outstanding dues.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Core** | React 19, Vite, ES6+ Javascript |
| **Styling & Animation** | Tailwind CSS, Autoprefixer, Framer Motion, React Icons |
| **Routing** | React Router DOM v7 |
| **Data Analytics** | Recharts (for responsive charts, graphs, and statistics) |
| **HTTP Client** | Axios (configured with interceptors for JWT bearer token injection) |
| **Reporting / Export** | xlsx, jspdf, jspdf-autotable, html2canvas, file-saver |
| **Utilities** | react-calendar, date-fns, react-helmet-async |

---

## ⚙️ Development & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and npm installed.

### 1. Installation
Clone the repository and install the npm dependencies:
```bash
npm install
```

### 2. Backend API Integration
The client is pre-configured to communicate with a Spring Boot REST API running locally at `http://localhost:8080/api`.
* Modify `src/api/apiService.js` or `src/services/api.js` if your backend endpoint is hosted elsewhere.

### 3. Run Locally
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for Production
Bundle the assets and optimize the application for production deployment:
```bash
npm run build
```
The output files will be generated in the `dist/` directory.

### 5. Preview Production Build
Locally preview the production bundle:
```bash
npm run preview
```

---

## 📂 Project Structure

```
XYZ School/
├── public/                 # Static assets (images, logos, icons)
├── src/
│   ├── api/                # Axios API clients & configs
│   ├── assets/             # Media and image resources
│   ├── auth/               # Auth workflows & credentials handling
│   ├── components/         # Reusable layouts (Navbar, Sidebar, ProtectedRoute, Toast)
│   ├── config/             # Role definitions and permissions mapping
│   ├── context/            # Global context providers (AppContext)
│   ├── dashboard/          # Specialized sub-portals (Admin, Student, Teacher)
│   ├── data/               # Static mock data / local state models
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Page templates (PublicLayout, DashboardLayout)
│   ├── pages/              # Core pages & route views (Admin, Teacher, Staff, Student dashboards)
│   ├── public-website/     # Landing pages, admissions, disclosures, and contact website
│   ├── routes/             # App route configuration and routing logic
│   ├── services/           # Fetch handlers and service APIs
│   ├── App.css             # Component-level styling overrides
│   ├── App.jsx             # Root layout and router assembly
│   ├── index.css           # Global styles and Tailwind configuration
│   └── main.jsx            # Application entry point
├── package.json            # Configuration and script dependencies
├── vite.config.js          # Vite build environment settings
└── tailwind.config.js      # Tailwind style tokens and system configurations
```

---

## 📄 License
This project is proprietary and built for **XYZ School** portal operations. All rights reserved.
