## Educonnect : *Connecting Teacher and Students Seamlessly !*


## 📑 Synopsis 

- Elevate education with streamlined communication, attendance, exams, and collaborative discussions—an efficient, secure platform fostering improved teacher-student collaboration.
- The application is optimized with code-splitting techniques using React's `react-lazy` and `Suspense` for lazy loading, along with an `error boundary` fallback UI.
- Deployed the frontend on `AWS Amplify` and the backend on `AWS Elastic Beanstalk`



## 📜 Features

1. **Authentication and Authorization:**
    - Secure user authentication using JWT tokens and Bcrypt.js for password hashing.
    - Three roles: Student, Teacher, and Admin.

2. **Teacher Functionality:**
    - View timetable and choose subjects directly from it.
    - Take and update student attendance for particular subjects.
    - Download attendance reports in xls format with minimum criteria.
    - Enter and manage marks with proper restrictions on the limit of marks.
    - Download marks reports by choosing subjects.
    - Solve student doubts through the discussion forum and chat.
    - Update profile.

4. **Student Functionality:**
    - View attendance with percentage.
    - Filter attendance by subject, date range, and sort options.
    - Ask doubts to teachers through the discussion forum.
    - Update profile.

5. **Admin Functionality:**
    - Create, manage, and assign subjects to teachers.
    - Create teacher accounts , manage it and send credentials via email.
    - Create and manage student accounts.
    - Create timetables for teachers with teacher's assign subjects.
     

## 🛠️Tech Stack

**Client:** 
* React
* Context API
* CSS
* Socket.io

**Server:** 
* NodeJs
* Express
* Nodemailer
* Crypto-JS
* Socket


**Database:**
* MongoDB 


## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Adityajparmar37/EduConnect.git
   ```

2. Go to backend and run 
    ```bash
    cd backend
    npm install
    ```

3. Go to frontend and run
    ```bash
    cd frontend
    npm install
    ```

4. Setup .env file 
    ```bash
    PORT = Port Number ( eg 3500 )
    MONGO_URI = "Your MongoDB Database URI"

    JWT_KEY = Your secret key

    KeyCrypt="Encryption key"

    EMAIL= "Email to send order confirmation mail"
    MAILPASS = "Google app-pass" 
    ```

5. To Run Project
    ```bash

    cd frontend
    npm start run 

    cd backend
    npm run dev
    ```
 🤞🏻 *Hope you find project useful*
