Portfolio Using React (MERN Stack)

React + Node/Express + MongoDB portfolio application — this project is a conversion of my non-React portfolio into a modern, React-based, MERN-stack portfolio site.

🔗 Live Demo: https://suman-7z.vercel.app/

📦 Repository: https://github.com/SUMAN-7z/Portfolio_Using_React

🧠 Project Overview

This is a full-stack portfolio application built with:

Frontend: React (likely with React Router, components, hooks, CSS)

Backend: Node.js + Express API

Database: MongoDB (assuming for contact messages or dynamic data)

Deployment: Frontend deployed on Vercel (backend likely hosted separately or locally)

It’s designed to showcase projects, skills, and contact info in a clean, responsive UI.

📁 Repository Structure
Portfolio_Using_React/
├── backend/       # Server (Node/Express)
├── frontend/      # React application
└── README.md



backend/ — server code (APIs, contact form handling).
frontend/ — React app (UI + pages).

💡 Features

✔ React-based component architecture
✔ Responsive UI for desktop + mobile
✔ API for backend interactions (e.g., contact form)
✔ MongoDB integration (if used)
✔ Deployed live (frontend)
✔ MERN stack fundamentals demonstrated

🚀 Getting Started

Follow these steps to run the project locally:

1. Clone the repo
git clone https://github.com/SUMAN-7z/Portfolio_Using_React.git
cd Portfolio_Using_React

2. Install dependencies
Backend:
cd backend
npm install

Frontend:
cd ../frontend
npm install

3. Environment variables

Create a .env file in backend/ with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email
EMAIL_PASS=your_email_password


(Adjust variables depending on backend needs — email service for contact form, etc.)

4. Run the application

In separate terminals:

Backend:

cd backend
node server.js


Frontend:

cd ../frontend
npm run dev


Navigate to http://localhost:3000 to view.

🛠 Tech Stack
Layer	Technology
Frontend	React
Backend	Node.js + Express
Database	MongoDB (assumed)
Deployment	Vercel (frontend)
📌 Deployment

Frontend is deployed on Vercel at the link above. Backend can be deployed on services like Render, Heroku, Railway, or Fly.io with environment variables configured.

📬 Contact

If you’d like to connect or provide feedback:

Email: sumankandisuman@gmail.com

Twitter / LinkedIn: www.linkedin.com/in/suman-kandi

GitHub: https://github.com/SUMAN-7z

⭐ Contributing

Contributions are welcome!

Fork the repository

Create your feature branch (git checkout -b feature/xyz)

Commit changes (git commit -m "Success")

Push and open a Pull Request

📄 License

This project is open source — specify your license (MIT / Apache / etc).
