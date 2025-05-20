README.md

# 🎓 EduConnect

EduConnect is a full-stack educational platform designed to bridge the gap between rural and urban students by providing access to engineering courses, downloadable video lectures, and seamless interaction between teachers and students.

## 📁 Project Structure

EduConnect/
│
├── backend/ # Node.js + Express backend API
├── frontend/ # React (TypeScript, Tailwind, Shadcn UI) frontend
├── .env # Environment variables (for local setup)
├── .dist/ # Build or deployment folder (optional)
└── README.md # Project documentation


---

## 🚀 Features

- 👨‍🏫 Role-based access (Student / Teacher / Admin)
- 🎥 Upload and stream lecture videos
- 💾 Download lectures for offline access
- 📚 Browse and enroll in engineering courses
- 🔒 JWT-based authentication
- 🧠 Tracks student learning progress

---

## ⚙️ Technologies Used

**Frontend**:
- React.js (with TypeScript)
- Tailwind CSS
- Shadcn UI
- Axios

**Backend**:
- Node.js with Express
- MySQL with Sequelize ORM
- JWT Authentication
- Multer for file upload

---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/EduConnect.git
cd EduConnect

2. Setup environment variables

Create a .env file in the root and add:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=educonnect_db
JWT_SECRET=your_jwt_secret

3. Install backend dependencies

cd backend
npm install

4. Install frontend dependencies

cd ../frontend
npm install

5. Run the application

Start backend:

cd ../backend
npm run dev

Start frontend:

cd ../frontend
npm run dev

📸 Screenshots

Add screenshots here of key pages like login, dashboard, video lecture, etc.
🧠 Contributors

    👤 Shaik Thaheer (Team Lead)

    👥 Project Team Members

📃 License

This project is licensed for educational purposes. Contact the team for reuse or collaboration.
