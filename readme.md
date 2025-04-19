# 🎓 Alumni Connect Portal

A full-stack web platform that helps educational institutions stay connected with their alumni through a centralized, searchable, and interactive alumni network. Designed for professional networking, event participation, mentorship, and community engagement.

---

## 🚀 Demo

Live Preview: [https://your-deployment-url.com](https://your-deployment-url.com)  
Demo Credentials:

- **Email**: testuser@example.com
- **Password**: password123

---

## 📌 Features

### ✅ Core Features

- 🔐 **User Authentication** (JWT-based login, protected routes)
- 📇 **Alumni Directory** (with search, sort & filter)
- 🧑‍💼 **Profile Pages** (editable, professional info)
- 🧵 **Community Feed** (post updates, opportunities)
- 📱 **Mobile Responsive UI**

### 🌟 Bonus Features (If implemented)

- 💬 **Private Messaging**
- 🏆 **Achievement Showcase**
- 🔗 **LinkedIn Integration**

---

## 🏗️ Tech Stack

| Part     | Tech Used                            |
| -------- | ------------------------------------ |
| Frontend | React.js + TailwindCSS / Bootstrap   |
| Backend  | Node.js + Express.js                 |
| Database | MongoDB Atlas                        |
| Auth     | JWT + bcrypt                         |
| Hosting  | Vercel (Frontend) + Render (Backend) |

---

## 🧱 Database Schema (MongoDB)

### User (Alumni)

```js
{
  name: String,
  email: String,
  password: String, // hashed
  role: String, // "alumni" | "admin"
  batch: String,
  branch: String,
  jobTitle: String,
  company: String,
  location: String,
  linkedin: String,
  achievements: [String],
  profileImage: String,
  bio: String,
  tags: [String],
  isVerified: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Post (Community Feed)

```
{
  author: ObjectId, // ref: 'User'
  title: String,
  body: String,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}

```

## Message (Optional - Private Messaging)

```
{
  sender: ObjectId, // ref: 'User'
  receiver: ObjectId, // ref: 'User'
  message: String,
  timestamp: Date
}
```

## 📡 API Endpoints

```/api/auth
POST /register – Register user

POST /login – Login user

POST /logout – Logout session

/api/users
GET /me – Current user data

PUT /update/:id – Update profile

GET /all – Get all users (with filters)

GET /:id – Get user profile by ID

/api/posts
POST /create – Create post

GET /all – Get all posts

GET /:id – Get single post

DELETE /:id/delete – Delete post

/api/messages (Bonus)
POST /send – Send message

GET /inbox/:id – Get all messages for user
```

## 🛠️ Installation & Setup

Clone the repo

```
git clone https://github.com/ADITYABHAVAR17/AlumniConnect.git
cd AlumniConnect
```

### Setup Frontend

```
cd frontend
npm install
npm run dev
```

### Setup Backend

```
cd backend
npm install
npm run dev
```

### Config .env file in backend

```
MONGO_URI=
JWT_SECRET=
FRONTEND_URL=
```
