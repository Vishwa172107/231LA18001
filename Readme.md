# 🔗 URL Shortener

A simple URL shortener app with expiration, analytics (access count + logs), and a clean React frontend.

---

## 🚀 Features

- Shorten long URLs into simple short links
- Auto-expire and delete URLs after their expiry time
- Track number of clicks and access logs (IP, User Agent)
- React frontend with clean UI and live shortened URLs
- Express + MongoDB backend with REST API

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Other**: Axios, React Router

---

## 📂 Project Structure

project-root/
│── backend/ # Express + MongoDB backend
│── frontend/ # React frontend (Vite)
│── README.md # Documentation

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/url-shortener.git
cd url-shortener

2️⃣ Backend Setup

Copy code
cd backend
npm install

🔑 Environment Variables
Create a .env file inside backend/ with the following:

PORT=5555
MONGO_URI=mongodb://localhost:27017/urlshortener
CLIENT_URL=http://localhost:3000

▶️ Start Backend

node server.js
Backend will run on http://localhost:5555

3️⃣ Frontend Setup

cd frontend
npm install

▶️ Start Frontend

npm run dev -- --port 3000
Frontend will run on http://localhost:3000

🖥 Usage
Open http://localhost:3000

Enter a long URL in the form

Get your shortened link instantly

Click on "View All Links" to see analytics & logs
